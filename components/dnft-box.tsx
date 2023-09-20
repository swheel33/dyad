import {
  useAccount,
  useContractInfiniteReads,
  useContractRead,
  useContractReads,
  useNetwork,
} from "wagmi";
import { Abi, formatEther } from "viem";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { useAllVaultsQuery } from "@/gql";
import { useMemo, useState } from "react";
import { deployments } from "@/lib/deployments";
import VaultManagerAbi from "@/abis/VaultManager.json";
import DyadAbi from "@/abis/Dyad.json";
import VaultAbi from "@/abis/Vault.json";
import DNftAbi from "@/abis/DNft.json";
import useModal from "@/contexts/modal";
import { AddVaultModalContent } from "./add-vault-modal-content";

export default function DnftBox() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const [selectedDnft, setSelectedDnft] = useState<string>();
  const [selectedVaultId, setSelectedVaultId] = useState<string>();
  const { pushModal } = useModal();

  const [allVaultsQuery] = useAllVaultsQuery({
    variables: {
      isLicensed: true,
    },
  });

  const { vaultManager, dyad, dnft } = useMemo(
    () => (chain ? deployments[chain.id] : Object.values(deployments)[0]),
    [chain]
  );

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
    ],
    watch: true,
    select: (data) => ({
      dnftBalance: +(data?.[0]?.result?.toString() ?? "0"),
      collateralRatio: (data?.[1]?.result ?? 0n) as bigint,
      totalValueLocked: (data?.[2]?.result ?? 0n) as bigint,
      dyadMinted: (data?.[3]?.result ?? 0n) as bigint,
    }),
  });
  const { dnftBalance, collateralRatio, totalValueLocked, dyadMinted } =
    initialContractReads ?? {};

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
    abi: VaultManagerAbi as Abi,
    functionName: "isDNftVault",
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

  const { data: vaultsData } = useContractReads({
    enabled: allVaultsQuery?.data?.vaults !== undefined,
    contracts: Array.apply(
      null,
      Array(allVaultsQuery?.data?.vaults?.length ?? 0)
    )
      .map((_, index) => [
        {
          address: (allVaultsQuery?.data?.vaults?.[index].id ??
            `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "asset",
        },
        {
          address: (allVaultsQuery?.data?.vaults?.[index].id ??
            `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "symbol",
        },
        {
          address: (allVaultsQuery?.data?.vaults?.[index].id ??
            `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "collatPrice",
        },
      ])
      .flat(),
    select: (data) => {
      const vaults: {
        address: string;
        asset: string;
        symbol: string;
        collatPrice: string;
      }[] = [];
      data.forEach((result, index) => {
        if (index % 3 === 0) {
          vaults.push({
            address: allVaultsQuery?.data?.vaults?.[index / 3].id ?? "",
            asset: result?.result?.toString() ?? "",
            symbol: data[index + 1]?.result?.toString() ?? "",
            collatPrice: data[index + 2]?.result?.toString() ?? "",
          });
        }
      });
      return vaults;
    },
  });

  return (
    <div className="container mx-auto p-4">
      {isConnected ? (
        <>
          {/* Select dNFT */}
          <Select onValueChange={setSelectedDnft}>
            <SelectTrigger id="select-dnft" className="mt-1">
              <SelectValue placeholder="Select dNFT" />
            </SelectTrigger>
            <SelectContent>
              {dnfts?.map((dnft) => (
                <SelectItem value={dnft} key={`dnft-${dnft}`}>
                  dNFT {dnft}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tabs */}

          <Tabs defaultValue="mint" className="mt-2">
            <TabsList className="my-2">
              <TabsTrigger value="mint">Mint & Deposit</TabsTrigger>
              <TabsTrigger value="burn">Burn & Withdraw</TabsTrigger>
            </TabsList>
            <TabsContent value="mint">
              <MintAndDepositTab
                setSelectedVaultId={setSelectedVaultId}
                vaults={vaultsData ?? []}
                selectedVault={vaultsData?.find(
                  (vault) => vault.address === selectedVaultId
                )}
              />
            </TabsContent>
            <TabsContent value="burn">
              <BurnAndWithdrawTab setSelectedVault={(test: string) => test} />
            </TabsContent>
          </Tabs>

          {/* Persistent dNFT Data Block */}
          <div className="mt-4 border p-4">
            <p className="text-sm text-muted-foreground">
              DYAD minted:{" "}
              <span className="text-foreground">
                {formatEther(dyadMinted ?? 0n)}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Collateral value:{" "}
              <span className="text-foreground">
                ${formatEther(totalValueLocked ?? 0n)}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Collateral Ratio:{" "}
              <span
                className={crColor(
                  dyadMinted === 0n
                    ? 100
                    : +formatEther(collateralRatio ?? 0n) * 100
                )}
              >
                {dyadMinted === 0n
                  ? "N/A"
                  : `${+formatEther(collateralRatio ?? 0n) * 100}%`}
              </span>
            </p>

            <Table className="w-full border mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Vault</TableHead>
                  <TableHead>TVL</TableHead>
                  <TableHead>Share</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { vault: "ETH", totalValue: 1000, share: "10%", value: 100 },
                ].map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.vault}</TableCell>
                    <TableCell>${data.totalValue}</TableCell>
                    <TableCell>{data.share}</TableCell>
                    <TableCell>${data.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center items-center">
          <WalletButton />
        </div>
      )}
    </div>
  );
}
