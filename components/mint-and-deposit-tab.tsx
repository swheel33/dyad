import { useCallback, useMemo, useState } from "react";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Abi, formatEther, parseEther } from "viem";

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
import ERC20 from "@/abis/ERC20.json";
import Loader from "./loader";
import { crColor } from "@/lib/utils";
import { deployments } from "@/lib/deployments";

interface Props {
  setSelectedVaultId: (value: string) => void;
  vaults: {
    address: string;
    asset: string;
    symbol: string;
    collatPrice: string;
  }[];
  vaultManager: string;
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

export default function MintAndDepositTab({
  collatRatio,
  setSelectedVaultId,
  selectedVault,
  vaults,
  weth,
  selectedDnft,
  totalValueLocked,
  dyadMinted,
  minCollateralizationRatio,
  vaultManager,
}: Props) {
  const { address } = useAccount();
  const [depositInput, setDepositInput] = useState<string>();
  const [mintInput, setMintInput] = useState<string>();

  const [depositAmount, depositAmountError] = useMemo(() => {
    if (depositInput === undefined || depositInput === "") {
      return [undefined, undefined];
    }
    try {
      return [parseEther(depositInput as string), undefined];
    } catch {
      return [undefined, "Invalid input"];
    }
  }, [depositInput]);

  const [mintAmount, mintAmountError] = useMemo(() => {
    if (mintInput === undefined || mintInput === "") {
      return [undefined, undefined];
    }
    try {
      return [parseEther(mintInput as string), undefined];
    } catch {
      return [undefined, "Invalid input"];
    }
  }, [mintInput]);

  const { data: balanceData } = useBalance({
    enabled: !!selectedVault?.asset,
    address,
    token: (selectedVault?.asset ?? "") as `0x${string}`,
  });

  const maxMint = useMemo(() => {
    if (
      totalValueLocked === undefined ||
      minCollateralizationRatio === undefined ||
      minCollateralizationRatio === BigInt(0) ||
      dyadMinted === undefined
    )
      return BigInt(0);
    return (
      (totalValueLocked * BigInt(10 ** 18)) / minCollateralizationRatio -
      dyadMinted
    );
  }, [minCollateralizationRatio, totalValueLocked, dyadMinted]);

  const { data: allowance } = useContractRead({
    // enabled: !!selectedVault?.asset,
    address: weth,
    abi: ERC20 as Abi,
    args: [address, vaultManager as `0x${string}`],
    functionName: "allowance",
    watch: true,
    select: (data) => data as bigint,
  });

  const {
    data: approvalTxData,
    isLoading: isApprovalLoading,
    isError: isApprovalError,
    write: approve,
    reset: approvalReset,
  } = useContractWrite({
    address: weth,
    abi: ERC20 as Abi,
    functionName: "approve",
    args: [vaultManager, depositAmount ?? BigInt(0)],
  });

  const { isLoading: isApprovalTxLoading, isError: isApprovalTxError } =
    useWaitForTransaction({
      hash: approvalTxData?.hash,
      onError: (err) => {
        console.error(err);
        approvalReset();
      },
      onSuccess: () => {
        approvalReset();
      },
    });

  const {
    data: depositTxData,
    isLoading: isDepositLoading,
    isError: isDepositError,
    write: deposit,
    reset: depositReset,
  } = useContractWrite({
    address: vaultManager,
    abi: VaultManagerAbi["abi"],
    functionName: "deposit",
    args: [
      selectedDnft ?? "0",
      selectedVault?.address,
      depositAmount ?? BigInt(0),
    ],
  });

  const { isLoading: isDepositTxLoading, isError: isDepositTxError } =
    useWaitForTransaction({
      hash: depositTxData?.hash,
      onError: (err) => {
        console.error(err);
        depositReset();
      },
      onSuccess: () => {
        depositReset();
        setDepositInput("");
      },
    });

  const setApproval = useCallback(() => {
    if (
      allowance !== undefined &&
      depositAmount !== undefined &&
      allowance < depositAmount
    ) {
      approve();
    }
  }, [allowance, depositAmount, approve]);

  const requiresApproval = useMemo(
    () =>
      allowance !== undefined &&
      depositAmount !== undefined &&
      allowance < depositAmount,
    [allowance, depositAmount]
  );

  const {
    data: mintTxData,
    isLoading: isMintLoading,
    isError: isMintError,
    write: mint,
    reset: mintReset,
  } = useContractWrite({
    address: vaultManager,
    abi: VaultManagerAbi["abi"],
    functionName: "mintDyad",
    args: [selectedDnft ?? "0", mintAmount ?? BigInt(0), address],
  });

  const { isLoading: isMintTxLoading, isError: isMintTxError } =
    useWaitForTransaction({
      hash: mintTxData?.hash,
      onError: (err) => {
        console.error(err);
        mintReset();
      },
      onSuccess: () => {
        mintReset();
        setMintInput("");
      },
    });

  const newCR = useMemo(() => {
    if ((dyadMinted ?? BigInt(0)) + (mintAmount ?? BigInt(0)) <= BigInt(0)) {
      return undefined;
    }
    return (
      (((totalValueLocked ?? BigInt(0)) +
        ((depositAmount ?? BigInt(0)) *
          BigInt(selectedVault?.collatPrice ?? parseEther("1"))) /
          parseEther("1")) *
        BigInt(10 ** 18)) /
      ((dyadMinted ?? BigInt(0)) + (mintAmount ?? BigInt(0)))
    );
  }, [dyadMinted, totalValueLocked, mintAmount, depositAmount, selectedVault]);

  return (
    <div>
      {/* Deposit Component */}
      <div className="mb-4 p-4 border">
        <Select
          onValueChange={(value) => {
            setSelectedVaultId(value);
          }}
          disabled={!selectedDnft}
        >
          <SelectTrigger className="mt-1 mb-4">
            <SelectValue placeholder="Select Vault" />
          </SelectTrigger>
          <SelectContent>
            {vaults.map((vault) => (
              <SelectItem key={vault.address} value={vault.address}>
                {vault.symbol}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Amount to Deposit"
            className="w-full p-2 border mb-2"
            disabled={!selectedVault}
            value={depositInput}
            onChange={(e) => setDepositInput(e.target.value)}
          />
          <Button
            className="p-2 border bg-gray-200"
            onClick={() => setDepositInput(balanceData?.formatted ?? "")}
            disabled={!selectedVault}
          >
            MAX
          </Button>
        </div>
        <p className="text-red-500 text-xs pb-2">
          {depositAmountError
            ? depositAmountError
            : depositAmount && balanceData && depositAmount > balanceData?.value
            ? "Not enough balance"
            : ""}
        </p>
        <p className="text-green-500 text-xs">
          {collatRatio ? (
            <>
              Old CR: <span>{+formatEther(collatRatio) * 100}%</span> -&gt;
            </>
          ) : (
            ""
          )}{" "}
          {!depositAmountError &&
          depositAmount &&
          newCR &&
          minCollateralizationRatio ? (
            <span
              className={crColor(
                +formatEther(newCR),
                +formatEther(minCollateralizationRatio) * 3
              )}
            >
              New CR: {+formatEther(newCR) * 100}%
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
            !depositAmount ||
            depositAmountError ||
            isApprovalLoading ||
            isApprovalTxLoading ||
            isDepositLoading ||
            isDepositTxLoading
          }
          onClick={() => {
            approvalReset();
            requiresApproval ? setApproval() : deposit();
          }}
        >
          {isApprovalLoading ||
          isApprovalTxLoading ||
          isDepositLoading ||
          isDepositTxLoading ? (
            <Loader />
          ) : requiresApproval ? (
            "Approve"
          ) : (
            `Deposit ${selectedVault?.symbol ?? ""}`
          )}
        </Button>
        <p className="text-red-500 text-xs pt-2">
          {isApprovalError || isApprovalTxError
            ? "Error approving token for deposit"
            : isDepositError || isDepositTxError
            ? "Error depositing token"
            : ""}
        </p>
      </div>

      {/* Mint Component */}
      <div className="mb-4 p-4 border">
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Amount to Mint"
            className="w-full p-2 border mb-2"
            value={mintInput}
            onChange={(e) => setMintInput(e.target.value)}
            disabled={!selectedDnft}
          />
          <Button
            className="p-2 border bg-gray-200"
            onClick={() => setMintInput(maxMint ? formatEther(maxMint) : "")}
            disabled={!selectedDnft}
          >
            MAX
          </Button>
        </div>
        <p className="text-red-500 text-xs pb-2">
          {mintAmountError
            ? mintAmountError
            : mintAmount && balanceData && mintAmount > maxMint
            ? "Not enough collateral"
            : ""}
        </p>
        <p className="text-green-500 text-xs">
          {collatRatio ? (
            <>
              Old CR: <span>{+formatEther(collatRatio) * 100}%</span> -&gt;
            </>
          ) : (
            ""
          )}{" "}
          {mintAmount && newCR && minCollateralizationRatio ? (
            <span
              className={crColor(
                +formatEther(newCR),
                +formatEther(minCollateralizationRatio) * 3
              )}
            >
              New CR: {+formatEther(newCR) * 100}%
            </span>
          ) : (
            ""
          )}
        </p>
        <Button
          className="mt-4 p-2"
          variant="default"
          disabled={
            mintAmount === undefined ||
            mintAmountError !== undefined ||
            // mintAmount > maxMint ||
            isMintLoading ||
            isMintTxLoading
          }
          onClick={() => {
            if (address !== undefined) {
              mint();
            }
          }}
        >
          {isMintLoading || isMintTxLoading ? <Loader /> : "Mint DYAD"}
        </Button>
        <p className="text-red-500 text-xs pt-2">
          {isMintError || isMintTxError ? "Error minting DYAD" : ""}
        </p>
      </div>
    </div>
  );
}
