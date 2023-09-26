"use client";

import { useMemo, useState } from "react";
import { useNetwork, useContractReads } from "wagmi";
import { Abi, formatEther, getAddress, numberToHex, parseEther } from "viem";

import { deployments } from "@/lib/deployments";
import { Separator } from "@/components/ui/separator";
import ClaimSection from "@/components/claim-section";
import DnftBox from "@/components/dnft-box";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VaultAbi from "@/abis/Vault.json";
import SLLAbi from "@/abis/SLL.json";

export default function Home() {
  const { chain } = useNetwork();
  const { vaultManager, dyad, dnft, vault, vaultManagerSLL } = useMemo(
    () =>
      chain && deployments[chain.id]
        ? deployments[chain.id]
        : Object.values(deployments)[0],
    [chain]
  );

  const vaults = vault ? [vault] : [];

  const { data: vaultsData } = useContractReads({
    watch: true,
    contracts: Array.apply(null, Array(vaults.length))
      .map((_, index) => [
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "asset",
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "symbol",
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "collatPrice",
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "decimals",
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "totalSupply",
        },
        {
          address: (vaultManagerSLL ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: SLLAbi as Abi,
          functionName: "votes",
          args: [vaults[index] ?? `0x${"0".repeat(40)}`],
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
        totalSupply: string;
        votes: string;
      }[] = [];
      data.forEach((result, index) => {
        if (index % 7 === 0) {
          v.push({
            address: vaults[index / 7] ?? "",
            asset: result?.result?.toString() ?? "",
            symbol: data[index + 1]?.result?.toString() ?? "",
            collatPrice: data[index + 2]?.result?.toString() ?? "",
            decimals: data[index + 3]?.result?.toString() ?? "",
            totalSupply: data[index + 4]?.result?.toString() ?? "",
            votes: data[index + 5]?.result?.toString() ?? "",
          });
        }
      });
      return v;
    },
  });

  return (
    <div className="flex-1 p-4 w-full max-w-screen-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead className="cursor-pointer">Collateral Type</TableHead>
            <TableHead className="text-right cursor-pointer">TVL</TableHead>
            <TableHead className="text-right cursor-pointer">
              Number of Votes
            </TableHead>
            {/* <TableHead className="text-right cursor-pointer">Vote</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {vaultsData?.map((vault) => (
            <TableRow className="cursor-pointer h-12" key={vault.address}>
              <TableCell className="font-medium">
                {vault.address.slice(0, 6) +
                  "..." +
                  vault.address.slice(
                    vault.address.length - 4,
                    vault.address.length
                  )}
              </TableCell>
              <TableCell>{vault.symbol.split(" ")[0]}</TableCell>
              <TableCell className="font-medium text-right">
                $
                {formatEther(
                  (BigInt(vault.collatPrice ?? 0) *
                    BigInt(vault.totalSupply ?? 1)) /
                    parseEther("1")
                )}
              </TableCell>
              <TableCell className="font-medium text-right">
                {vault.votes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
