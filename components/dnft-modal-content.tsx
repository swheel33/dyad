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
import { CardTitle } from "./ui/card";
import { Separator } from "@/components/ui/separator";
import AdjustVaultModalContent from "./adjust-vault-modal-content";
import useModal from "@/contexts/modal";

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
      <div className="dyad-section flex flex-col space-y-1">
        <CardTitle className="text-lg">Stats</CardTitle>
        <div className="grid grid-rows-2 grid-cols-2 pb-3">
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
            <span>{(+formatEther(BigInt(dnft.price)) * 100).toFixed(2)}%</span>
          </p>
        </div>
        <Separator />
        <div className="flex space-x-8 py-4 justify-between">
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
        <Separator />
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
