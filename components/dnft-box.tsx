import { useAccount, useContractReads, useNetwork } from "wagmi";
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
import { useUserOwnedDnftsQuery } from "@/gql";
import { useEffect, useMemo, useState } from "react";
import { deployments } from "@/lib/deployments";
import VaultManagerAbi from "@/abis/VaultManager.json";
import DyadAbi from "@/abis/Dyad.json";

export default function DnftBox() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const [selectedDnft, setSelectedDnft] = useState<string>();
  const [selectedVault, setSelectedVault] = useState<string>();

  const [res] = useUserOwnedDnftsQuery({
    pause: !address,
    variables: {
      user: address,
    },
  });

  const { vaultManager, dyad } = useMemo(
    () => (chain ? deployments[chain.id] : Object.values(deployments)[0]),
    [chain]
  );

  const { data } = useContractReads({
    contracts: [
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
  });
  const collateralRatio = (data?.[0]?.result ?? 0n) as bigint;
  const totalValueLocked = (data?.[1]?.result ?? 0n) as bigint;
  const dyadMinted = (data?.[2]?.result ?? 0n) as bigint;

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
              {res?.data?.dnfts.map((dnft) => (
                <SelectItem value={dnft.id} key={`dnft-${dnft.id}`}>
                  dNFT {dnft.id}
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
              <MintAndDepositTab setSelectedVault={(test: string) => test} />
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
                {formatEther(data?.[1]?.result ?? 0)}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Collateral value:{" "}
              <span className="text-foreground">
                ${formatEther(data?.[2]?.result ?? 0)}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Collateral Ratio:{" "}
              <span
                className={crColor(
                  dyadMinted === 0n ? 100 : +formatEther(collateralRatio) * 100
                )}
              >
                {dyadMinted === 0n
                  ? "N/A"
                  : `${+formatEther(collateralRatio) * 100}%`}
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
