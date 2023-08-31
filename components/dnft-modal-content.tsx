import { formatEther } from "viem";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DnftChart from "./dnft-chart";
import { CardTitle } from "./ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { crColor } from "@/lib/utils";
import { useState } from "react";
import { PopoverAnchor } from "@radix-ui/react-popover";
import AdjustVaultModalContent from "./adjust-vault-modal-content";
import useModal from "@/contexts/modal";

const testData = [
  {
    minted: 4000,
    shares: 2400,
    timestamp: 2400,
  },
  {
    minted: 3000,
    shares: 1398,
    timestamp: 2210,
  },
  {
    minted: 2000,
    shares: 9800,
    timestamp: 2290,
  },
  {
    minted: 2780,
    shares: 3908,
    timestamp: 2000,
  },
  {
    minted: 1890,
    shares: 4800,
    timestamp: 2181,
  },
  {
    minted: 2390,
    shares: 3800,
    timestamp: 2500,
  },
  {
    minted: 3490,
    shares: 4300,
    timestamp: 2100,
  },
];

const vaults = [
  {
    id: "wETH",
    value: 16700,
    apy: 5.6,
    earnings: 897,
  },
  {
    id: "stETH",
    value: 8030,
    apy: 3.7,
    earnings: 277,
  },
  {
    id: "TBY",
    value: 6852,
    apy: 8.0,
    earnings: 683,
  },
];

interface Props {
  dnft: {
    id: string;
    minter: string;
    price: string;
  };
}

export default function DnftModalContent({ dnft }: Props) {
  const { pushModal } = useModal();

  return (
    <>
      <div className="dyad-section flex flex-col space-y-1 mb-4">
        <CardTitle className="text-lg">Stats</CardTitle>
        <div className="grid grid-rows-2 grid-cols-2">
          <p className="text-md font-medium text-muted-foreground leading-loose">
            Minted: <span className="text-foreground">3490</span>
          </p>
          <p className="text-md font-medium text-muted-foreground leading-loose text-right">
            ID: <span className="text-foreground">#1</span>
          </p>
          <p className="text-md font-medium text-muted-foreground leading-loose">
            Shares: <span className="text-foreground">4300</span>
          </p>
          <p className="text-md font-medium text-muted-foreground leading-loose text-right">
            CR:{" "}
            <span className={crColor(+formatEther(BigInt(dnft.price)))}>
              {(+formatEther(BigInt(dnft.price)) * 100).toFixed(2)}%
            </span>
          </p>
        </div>
        <DnftChart data={testData} />
        <Separator />

        <div className="flex space-x-8 pt-4 justify-between">
          <div className="flex gap-2 items-center">
            <Input type="number" placeholder="Mint DYAD" />
            <p className="text-xs cursor-pointer">MAX</p>
            <Button variant="secondary">Mint</Button>
          </div>
          <div className="flex gap-2 items-center">
            <Input type="number" placeholder="Redeem DYAD" />
            <p className="text-xs cursor-pointer hover:underline">MAX</p>
            <Button variant="secondary">Burn</Button>
          </div>
        </div>
      </div>

      <div className="vault-section flex flex-col space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vault</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Yield</TableHead>
              <TableHead>Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaults.map(({ id, value, apy, earnings }) => (
              <TableRow
                className="h-12 w-full cursor-pointer"
                onClick={() =>
                  pushModal(<AdjustVaultModalContent vault={{ id }} />)
                }
                key={id}
              >
                <TableCell>{id}</TableCell>
                <TableCell>${value}</TableCell>
                <TableCell>{apy}%</TableCell>
                <TableCell>${earnings}</TableCell>
              </TableRow>
            ))}
            {new Array(5 - vaults.length).fill(null).map((_, idx) => (
              <TableRow key={`option-${idx}`}>
                <TableCell colSpan={4}>
                  <Popover>
                    <PopoverTrigger className="w-full">
                      <Button variant="outline" className="w-full">
                        +
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      {/* ... (Your provided design for the Deposit/Withdraw popover) ... */}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="claim-section">
          <Button>Claim Bonus</Button>
        </div>
      </div>
    </>
  );
}
