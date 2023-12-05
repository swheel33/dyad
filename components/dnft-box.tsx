import {
  useAccount,
  useContractRead,
  useContractReads,
  useNetwork,
} from "wagmi";
import { Abi, formatEther, getAddress, numberToHex } from "viem";
import { useMemo, useState } from "react";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MintAndDepositTab from "@/components/mint-and-deposit-tab";
import BurnAndWithdrawTab from "@/components/burn-and-withdraw-tab";
import { crColor } from "@/lib/utils";
import WalletButton from "./ui/wallet-button";
import { deployments } from "@/lib/deployments";
import VaultManagerAbi from "@/abis/VaultManager.json";
import DyadAbi from "@/abis/Dyad.json";
import VaultAbi from "@/abis/Vault.json";
import DNftAbi from "@/abis/DNft.json";
import useModal from "@/contexts/modal";
import { AddVaultModalContent } from "./add-vault-modal-content";
import { ClaimModalContent } from "./claim-modal-content";

export default function DnftBox() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const [selectedDnft, setSelectedDnft] = useState<string>();
  const [selectedVaultId, setSelectedVaultId] = useState<string>();
  const { pushModal } = useModal();

  const { vaultManager, dyad, dnft, vault, weth } = useMemo(
    () =>
      chain && deployments[chain.id]
        ? deployments[chain.id]
        : Object.values(deployments)[0],
    [chain]
  );

  const vaults = vault ? [vault] : [];

  const { data: initialContractReads } = useContractReads({
    contracts: [
      {
        address: dnft as `0x${string}`,
        abi: DNftAbi as Abi,
        functionName: "balanceOf",
        args: [address ?? "0"],
      },
      {
        address: vaultManager as `0x${string}`,
        abi: VaultManagerAbi as Abi,
        functionName: "collatRatio",
        args: [selectedDnft ?? "0"],
      },
      {
        address: vaultManager as `0x${string}`,
        abi: VaultManagerAbi as Abi,
        functionName: "getVaultsUsdValue",
        args: [selectedDnft ?? "0"],
      },
      {
        address: dyad as `0x${string}`,
        abi: DyadAbi as Abi,
        functionName: "mintedDyad",
        args: [vaultManager, selectedDnft ?? "0"],
      },
      {
        address: vaultManager as `0x${string}`,
        abi: VaultManagerAbi as Abi,
        functionName: "MIN_COLLATERIZATION_RATIO",
      },
    ],
    watch: true,
    select: (data) => ({
      dnftBalance: +(data?.[0]?.result?.toString() ?? "0"),
      collateralRatio: (data?.[1]?.result ?? BigInt(0)) as bigint,
      totalValueLocked: (data?.[2]?.result ?? BigInt(0)) as bigint,
      dyadMinted: (data?.[3]?.result ?? BigInt(0)) as bigint,
      minCollateralizationRatio: (data?.[4]?.result ?? BigInt(0)) as bigint,
    }),
  });
  const {
    dnftBalance,
    collateralRatio,
    totalValueLocked,
    dyadMinted,
    minCollateralizationRatio,
  } = initialContractReads ?? {};

  // Get addresses of all dnfts owned by user
  const { data: dnfts } = useContractReads({
    contracts: Array.apply(null, Array(dnftBalance ?? 0)).map((_, index) => ({
      address: dnft as `0x${string}`,
      abi: DNftAbi as Abi,
      functionName: "tokenOfOwnerByIndex",
      args: [address ?? "0", index],
    })),
    watch: true,
    select: (data) =>
      data
        .map((dnft) => (dnft?.result ?? -1).toString())
        .filter((id) => id !== "-1"),
  });

  // Prompt user to add vault if they haven't already
  useContractRead({
    enabled: selectedDnft !== undefined && selectedVaultId !== undefined,
    address: vaultManager as `0x${string}`,
    abi: VaultManagerAbi["abi"],
    functionName: "hasVault",
    args: [selectedDnft, selectedVaultId],
    onSuccess: (result) => {
      if (
        result !== undefined &&
        selectedDnft !== undefined &&
        selectedVaultId !== undefined &&
        !result
      ) {
        pushModal(
          <AddVaultModalContent
            dnft={selectedDnft}
            vault={selectedVaultId}
            vaultManagerAddress={vaultManager}
          />
        );
      }
    },
  });

  const { data: vD } = useContractReads({
    contracts: [
      {
        address: "0x2AF67FB7188ABb1f4ddBefc1Ce6177D0F09a21bf",
        abi: VaultAbi["abi"],
        functionName: "getUsdValue",
        args: [selectedDnft ?? "0"],
      },
      {
        address: "0x2AF67FB7188ABb1f4ddBefc1Ce6177D0F09a21bf",
        abi: VaultAbi["abi"],
        functionName: "id2asset",
        args: [selectedDnft ?? "0"],
      },
    ],
  });

  const { data: vM } = useContractReads({
    contracts: [
      {
        address: "0xC48B1bDfAD6B3a5D54EEbb48A2Eb70Cd4e7760bc",
        abi: VaultManagerAbi["abi"],
        functionName: "collatRatio",
        args: [selectedDnft ?? "0"],
      },
    ],
  });

  const { data: vaultsData } = useContractReads({
    watch: true,
    contracts: Array.apply(null, Array(vaults.length))
      .map((_, index) => [
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi["abi"],
          functionName: "asset",
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi["abi"],
          functionName: "symbol",
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi["abi"],
          functionName: "collatPrice",
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi["abi"],
          functionName: "decimals",
        },
        {
          address: vaultManager as `0x${string}`,
          abi: VaultAbi["abi"],
          functionName: "getUsdValue",
          args: [selectedDnft ?? "0"],
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "balanceOf",
          args: [
            getAddress(
              numberToHex(BigInt(selectedDnft ?? "0"), { size: 20 })
            ) as `0x${string}`,
          ],
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "totalSupply",
        },
      ])
      .flat(),
    select: (data) => {
      const v: {
        address: string;
        asset: string;
        symbol: string;
        collatPrice: string;
        decimals: string;
        tvl: string;
        share: string;
        value: string;
      }[] = [];
      data.forEach((result, index) => {
        if (index % 7 === 0) {
          const share =
            data[index + 5]?.result && data[index + 6]?.result
              ? (
                  (BigInt(data[index + 5]?.result?.toString() ?? "0") *
                    BigInt(10 ** 18)) /
                  BigInt(data[index + 6]?.result?.toString() ?? "1")
                ).toString()
              : "0";
          const tvl = data[index + 4]?.result?.toString() ?? "";
          const value =
            share !== "0"
              ? ((BigInt(tvl) * BigInt(share)) / BigInt(10 ** 18)).toString()
              : "0";
          v.push({
            address: vaults[index / 7] ?? "",
            asset: weth,
            symbol: "WETH",
            collatPrice: data[index + 2]?.result?.toString() ?? "",
            decimals: data[index + 3]?.result?.toString() ?? "",
            tvl,
            share,
            value,
          });
        }
      });
      return v;
    },
  });

  return (
    <div className="pt-4">
      {isConnected ? (
        <Select onValueChange={setSelectedDnft}>
          <SelectTrigger id="select-dnft" className="mt-1">
            <SelectValue placeholder="Select Note" />
          </SelectTrigger>
          <SelectContent>
            {dnfts?.map((dnft) => (
              <SelectItem value={dnft} key={`dnft-${dnft}`}>
                Note {dnft}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="flex w-full justify-between items-center mb-2">
          <Button
            onClick={() => {
              pushModal(<ClaimModalContent />);
            }}
          >
            Claim Note
          </Button>
          <WalletButton />
        </div>
      )}

      {
        <div className="pt-4">
          <MintAndDepositTab
            setSelectedVaultId={setSelectedVaultId}
            vaults={vaultsData ?? []}
            vault={vault}
            weth={weth}
            vaultManager={vaultManager}
            selectedVault={vaultsData?.find(
              (vault) => vault?.address === selectedVaultId
            )}
            selectedDnft={selectedDnft}
            dyadMinted={dyadMinted}
            totalValueLocked={totalValueLocked}
            minCollateralizationRatio={minCollateralizationRatio}
          />
          <BurnAndWithdrawTab
            setSelectedVaultId={setSelectedVaultId}
            vaults={vaultsData ?? []}
            vault={vault}
            vaultManager={vaultManager}
            selectedVault={vaultsData?.find(
              (vault) => vault?.address === selectedVaultId
            )}
            selectedDnft={selectedDnft}
            dyadMinted={dyadMinted}
            totalValueLocked={totalValueLocked}
            minCollateralizationRatio={minCollateralizationRatio}
            dyad={dyad}
            collatRatio={collateralRatio}
          />
          {/* Persistent Note Data Block */}
          <div
            className={`mt-4 border p-4 ${selectedDnft ? "" : "opacity-50"}`}
          >
            <Table className="w-full border mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Vault</TableHead>
                  <TableHead>Minted DYAD</TableHead>
                  <TableHead>Collateral</TableHead>
                  <TableHead>Collateral Ratio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaultsData?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.symbol}</TableCell>
                    <TableCell>
                      ${formatEther(BigInt(vD[1].result) * BigInt(100))}
                    </TableCell>
                    <TableCell>${formatEther(BigInt(vD[0].result))}</TableCell>
                    <TableCell>
                      {formatEther(BigInt(vM[0].result) * BigInt(100))}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      }
    </div>
  );
}
