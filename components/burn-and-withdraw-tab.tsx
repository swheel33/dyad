import { useMemo, useState } from "react";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VaultManagerAbi from "@/abis/VaultManager.json";
import VaultAbi from "@/abis/Vault.json";
import { Abi, formatEther, getAddress, numberToHex, parseEther } from "viem";
import Loader from "./loader";
import { crColor } from "@/lib/utils";

interface Props {
  setSelectedVaultId: (value: string) => void;
  vaults: {
    address: string;
    asset: string;
    symbol: string;
    collatPrice: string;
  }[];
  vaultManager: string;
  dyad: string;
  selectedDnft?: string;
  selectedVault?: {
    address: string;
    asset: string;
    symbol: string;
    collatPrice: string;
  };
  collatRatio?: bigint;
  totalValueLocked?: bigint;
  dyadMinted?: bigint;
  minCollateralizationRatio?: bigint;
}

export default function BurnAndWithdrawTab({
  setSelectedVaultId,
  selectedVault,
  vaults,
  vault,
  selectedDnft,
  totalValueLocked,
  dyadMinted,
  minCollateralizationRatio,
  vaultManager,
  dyad,
  collatRatio,
}: Props) {
  const [oldCR, setOldCR] = useState(0);
  const [withdrawInput, setWithdrawInput] = useState<string>();
  const [burnInput, setBurnInput] = useState<string>();
  const { address } = useAccount();

  const [withdrawAmount, withdrawAmountError] = useMemo(() => {
    if (withdrawInput === undefined || withdrawInput === "") {
      return [undefined, undefined];
    }
    try {
      return [parseEther(withdrawInput as string), undefined];
    } catch {
      return [undefined, "Invalid input"];
    }
  }, [withdrawInput]);

  const [burnAmount, burnAmountError] = useMemo(() => {
    if (burnInput === undefined || burnInput === "") {
      return [undefined, undefined];
    }
    try {
      return [parseEther(burnInput as string), undefined];
    } catch {
      return [undefined, "Invalid input"];
    }
  }, [burnInput]);

  const { data: dyadBalance } = useBalance({
    address,
    token: dyad as `0x${string}`,
  });

  const { data: withdrawableBalance } = useContractReads({
    contracts: [
      {
        address: selectedVault?.address as `0x${string}`,
        abi: VaultAbi as Abi,
        functionName: "balanceOf",
        args: [
          getAddress(numberToHex(BigInt(selectedDnft ?? "0"), { size: 20 })),
        ],
      },
      {
        address: selectedVault?.address as `0x${string}`,
        abi: VaultAbi as Abi,
        functionName: "convertToAssets",
        args: [parseEther("1")],
      },
    ],
    select: (data) => {
      const balance = data?.[0]?.result as bigint;
      const price = data?.[1]?.result as bigint;
      if (balance === undefined || price === undefined) return undefined;
      return (balance * price) / BigInt(10 ** 18);
    },
  });

  const {
    data: withdrawTxData,
    isLoading: isWithdrawLoading,
    isError: isWithdrawError,
    write: withdraw,
    reset: withdrawReset,
  } = useContractWrite({
    address: vaultManager,
    abi: VaultManagerAbi["abi"],
    functionName: "withdraw",
    args: [selectedDnft ?? "0", vault, withdrawAmount ?? BigInt(0), address],
  });

  const { isLoading: isWithdrawTxLoading, isError: isWithdrawTxError } =
    useWaitForTransaction({
      hash: withdrawTxData?.hash,
      onError: (err) => {
        console.error(err);
        withdrawReset();
      },
      onSuccess: () => {
        withdrawReset();
        setWithdrawInput("");
      },
    });

  const {
    data: burnTxData,
    isLoading: isBurnLoading,
    isError: isBurnError,
    write: burn,
    reset: burnReset,
  } = useContractWrite({
    address: vaultManager as `0x${string}`,
    abi: VaultManagerAbi["abi"],
    functionName: "burnDyad",
    args: [selectedDnft ?? "0", burnAmount ?? BigInt(0)],
  });

  const { isLoading: isBurnTxLoading, isError: isBurnTxError } =
    useWaitForTransaction({
      hash: burnTxData?.hash,
      onError: (err) => {
        console.error(err);
        burnReset();
      },
      onSuccess: () => {
        burnReset();
        setBurnInput("");
      },
    });

  const newCR = useMemo(() => {
    if (
      (dyadMinted ?? BigInt(0)) - (burnAmount ?? BigInt(0)) === BigInt(0) ||
      !collatRatio
    ) {
      return undefined;
    }
    return (
      (((totalValueLocked ?? BigInt(0)) -
        ((withdrawAmount ?? BigInt(0)) *
          BigInt(selectedVault?.collatPrice ?? parseEther("1"))) /
          parseEther("1")) *
        BigInt(10 ** 18)) /
      ((dyadMinted ?? BigInt(0)) - (burnAmount ?? BigInt(0)))
    );
  }, [
    dyadMinted,
    totalValueLocked,
    burnAmount,
    withdrawAmount,
    selectedVault,
    collatRatio,
  ]);

  return (
    <div>
      {/* Burn Component */}
      <div className="mb-4 p-4 border">
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Amount to Burn"
            className="w-full p-2 border mb-2"
            value={burnInput}
            onChange={(e) => setBurnInput(e.target.value)}
            disabled={!selectedDnft}
          />
          <Button
            className="p-2 border bg-gray-200"
            onClick={() => setBurnInput(dyadBalance?.formatted ?? "")}
            disabled={!selectedDnft}
          >
            MAX
          </Button>
        </div>
        <p className="text-red-500 text-xs">
          {burnAmount &&
          !burnAmountError &&
          newCR !== undefined &&
          minCollateralizationRatio ? (
            <span
              className={crColor(
                +formatEther(newCR),
                +formatEther(minCollateralizationRatio) * 3
              )}
            >
              New CR:{" "}
              {newCR > BigInt(0) ? `${+formatEther(newCR) * 100}%` : "Invalid"}
            </span>
          ) : (
            ""
          )}
        </p>
        <Button
          className="mt-4 p-2"
          variant="default"
          disabled={
            dyadBalance?.value === undefined ||
            !burnAmount ||
            burnAmountError ||
            isBurnLoading ||
            isBurnTxLoading ||
            burnAmount > dyadBalance?.value
          }
          onClick={() => {
            if (address !== undefined) {
              burn();
            }
          }}
        >
          {isBurnLoading || isBurnTxLoading ? <Loader /> : "Burn DYAD"}
        </Button>
        <p className="text-red-500 text-xs pb-2">
          {isBurnError || isBurnTxError ? "Error burning DYAD" : ""}
        </p>
      </div>
      {/* Withdraw Component */}
      <div className="mb-4 p-4 border">
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Amount to Withdraw"
            className="w-full p-2 border mb-2"
            value={withdrawInput}
            // disabled={!selectedVault}
            onChange={(e) => setWithdrawInput(e.target.value)}
          />
          {/* <Button */}
          {/*   className="p-2 border bg-gray-200" */}
          {/*   disabled={!selectedVault} */}
          {/*   onClick={() => */}
          {/*     setWithdrawInput( */}
          {/*       withdrawableBalance ? formatEther(withdrawableBalance) : "" */}
          {/*     ) */}
          {/*   } */}
          {/* > */}
          {/*   MAX */}
          {/* </Button> */}
        </div>
        <p className="text-red-500 text-xs">
          {!withdrawAmountError &&
          withdrawAmount &&
          newCR &&
          minCollateralizationRatio ? (
            <span
              className={crColor(
                +formatEther(newCR),
                +formatEther(minCollateralizationRatio) * 3
              )}
            >
              New CR:{" "}
              {newCR > BigInt(0) ? `${+formatEther(newCR) * 100}%` : "Invalid"}
            </span>
          ) : (
            ""
          )}
        </p>
        <Button
          className="mt-4 p-2"
          variant="default"
          disabled={
            !selectedVault ||
            !withdrawAmount ||
            withdrawAmountError ||
            isWithdrawLoading ||
            isWithdrawTxLoading
          }
          onClick={() => {
            if (address !== undefined) {
              withdraw();
            }
          }}
        >
          {isWithdrawLoading || isWithdrawTxLoading ? (
            <Loader />
          ) : (
            `Withdraw ${selectedVault?.symbol ?? ""}`
          )}
        </Button>
        <p className="text-red-500 text-xs pb-2">
          {isWithdrawError || isWithdrawTxError
            ? "Error withdrawing token"
            : ""}
        </p>
      </div>
    </div>
  );
}
