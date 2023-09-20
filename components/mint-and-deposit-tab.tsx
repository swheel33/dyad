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
import VaultAbi from "@/abis/Vault.json";
import ERC20 from "@/abis/ERC20.json";
import Loader from "./loader";

interface Props {
  setSelectedVaultId: (value: string) => void;
  vaults: {
    address: string;
    asset: string;
    symbol: string;
    collatPrice: string;
  }[];
  selectedVault?: {
    address: string;
    asset: string;
    symbol: string;
    collatPrice: string;
  };
  collatRatio?: bigint;
  vaultUsdValue?: bigint;
  dyadMinted?: bigint;
}

export default function MintAndDepositTab({
  collatRatio,
  setSelectedVaultId,
  selectedVault,
  vaults,
}: Props) {
  const { address } = useAccount();
  const [newCR, setNewCR] = useState(BigInt(0));
  const [depositInput, setDepositInput] = useState<string>();

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

  const { data: balanceData } = useBalance({
    enabled: !!selectedVault?.asset,
    address,
    token: (selectedVault?.asset ?? "") as `0x${string}`,
  });

  const { data: allowance } = useContractRead({
    enabled: !!selectedVault?.asset,
    address: (selectedVault?.asset ?? "") as `0x${string}`,
    abi: ERC20 as Abi,
    args: [address ?? "0", selectedVault?.address ?? "0"],
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
    address: selectedVault?.asset as `0x${string}`,
    abi: ERC20 as Abi,
    functionName: "approve",
    args: [selectedVault?.address ?? "0", depositAmount ?? BigInt(0)],
  });

  const { isLoading: isApprovalTxLoading, isError: isApprovalTxError } =
    useWaitForTransaction({
      hash: approvalTxData?.hash,
      onError: console.error,
    });

  const {
    data: depositTxData,
    isLoading: isDepositLoading,
    isError: isDepositError,
    write: deposit,
    reset: depositReset,
  } = useContractWrite({
    address: selectedVault?.address as `0x${string}`,
    abi: ERC20 as Abi,
    functionName: "approve",
    args: [selectedVault?.address ?? "0", depositAmount ?? BigInt(0)],
  });

  const { isLoading: isDepositTxLoading, isError: isDepositTxError } =
    useWaitForTransaction({
      hash: depositTxData?.hash,
      onError: console.error,
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

  return (
    <div>
      {/* Deposit Component */}
      <div className="mb-4 p-4 border">
        <Select
          onValueChange={(value) => {
            setSelectedVaultId(value);
          }}
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
            value={depositInput}
            onChange={(e) => setDepositInput(e.target.value)}
          />
          <Button
            className="p-2 border bg-gray-200"
            onClick={() => setDepositInput(balanceData?.formatted ?? "")}
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
          New CR: {+formatEther(newCR) * 100}%
        </p>
        <Button
          className="mt-4 p-2"
          variant="default"
          disabled={!selectedVault || !depositAmount || depositAmountError}
          onClick={() => {
            approvalReset();
            requiresApproval ? setApproval() : console.log();
          }}
        >
          {isApprovalLoading || isApprovalTxLoading ? (
            <Loader />
          ) : requiresApproval ? (
            "Approve"
          ) : (
            `Deposit ${selectedVault?.symbol ?? ""}`
          )}
        </Button>
        <p className="text-red-500 text-xs pb-2">
          {isApprovalError || isApprovalTxError
            ? "Error approving token for deposit"
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
            onChange={(e) =>
              setNewCR((collatRatio ?? BigInt(0)) + parseEther(e.target.value))
            }
          />
          <Button
            className="p-2 border bg-gray-200"
            onClick={() => setNewCR((collatRatio ?? BigInt(0)) + BigInt(100))}
          >
            MAX
          </Button>
        </div>
        <p className="text-green-500 text-xs">
          {collatRatio ? (
            <>
              Old CR: <span>{+formatEther(collatRatio) * 100}%</span> -&gt;
            </>
          ) : (
            ""
          )}{" "}
          New CR: {+formatEther(newCR) * 100}%
        </p>
        <Button className="mt-4 p-2" variant="default">
          Mint DYAD
        </Button>
      </div>
    </div>
  );
}
