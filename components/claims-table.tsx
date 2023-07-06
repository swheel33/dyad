"use client";

import { useAllDnftMintsQuery } from "@/gql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatEther } from "viem";
import { shortAddr } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function ClaimsTable({ className }: Props) {
  const [{ data }] = useAllDnftMintsQuery();

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">User</TableHead>
          <TableHead>dNFT ID</TableHead>
          <TableHead>Contribution</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.mintedNfts.map((mint) => (
          <TableRow key={mint.DNft_id}>
            <TableCell className="font-medium">{shortAddr(mint.to)}</TableCell>
            <TableCell>#{+mint.DNft_id + 1}</TableCell>
            <TableCell>{formatEther(mint.price)} ETH</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
