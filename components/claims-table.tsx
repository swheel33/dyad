"use client";

import { useCallback, useState } from "react";
import { formatEther } from "viem";

import { useAllDnftMintsQuery } from "@/gql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { shortAddr } from "@/lib/utils";
import useModal from "@/contexts/modal";
import DnftModalContent from "./dnft-modal-content";

interface Props {
  className?: string;
}

const perPage = 15;

export default function ClaimsTable({ className }: Props) {
  const [page, setPage] = useState(0);

  const { setModal } = useModal();
  const [{ data }] = useAllDnftMintsQuery({
    variables: {
      numResults: perPage,
      skip: page * perPage,
    },
  });

  const openModal = useCallback(() => {
    setModal(<DnftModalContent />);
  }, [setModal]);

  const crColor = (cr: number): string => {
    switch (true) {
      case cr < 20:
        return "text-red-500";
      case cr < 30:
        return "text-yellow-500";
      case cr < 40:
        return "text-green-500";
      default:
        return "text-green-500";
    }
  };

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">dNFT ID</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Collateralization Ratio (CR)</TableHead>
            <TableHead>DYAD Minted</TableHead>
            <TableHead>Vault Shares</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.mintedNfts.map((mint) => (
            <TableRow
              key={mint.DNft_id}
              onClick={openModal}
              className="cursor-pointer"
            >
              <TableCell>#{mint.DNft_id}</TableCell>
              <TableCell className="font-medium">
                {shortAddr(mint.to)}
              </TableCell>
              <TableCell
                className={`text-right ${crColor(
                  +formatEther(mint.price) * 100
                )}`}
              >
                {(+formatEther(mint.price) * 100).toFixed(2)}%
              </TableCell>
              <TableCell className="font-medium text-right">
                {+formatEther(mint.price) * 1000}
              </TableCell>
              <TableCell className="font-medium text-right">
                ${(+formatEther(mint.price) * 100).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full max-w-none flex justify-center align-center mt-4 gap-8">
        <div className="w-8 text-center">
          {page !== 0 && (
            <p
              className="text-md text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => setPage(page - 1)}
            >
              prev
            </p>
          )}
        </div>
        <p className="text-md text-center">{page + 1}</p>
        <div className="w-8 text-center">
          {data?.mintedNfts.length === perPage && (
            <p
              className="text-md text-muted-foreground hover:text-foreground cursor-pointer justify-self-end"
              onClick={() => setPage(page + 1)}
            >
              next
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
