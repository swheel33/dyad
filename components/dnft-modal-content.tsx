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

interface Props {
  dnft: {
    id: string;
    minter: string;
    price: string;
  };
}

export default function DnftModalContent({ dnft }: Props) {
  return (
    <>
      <div className="dyad-section flex flex-col space-y-1 m-4">
        <CardTitle className="text-lg">Stats</CardTitle>
        <p className="text-sm font-medium text-muted-foreground leading-loose">
          DYAD Minted: <span className="text-foreground">3490</span>
        </p>
        <p className="text-sm font-medium text-muted-foreground leading-loose">
          Shares: <span className="text-foreground">4300</span>
        </p>
        <DnftChart data={testData} />
        <Separator />

        <div className="mint-section flex space-x-2 pt-4">
          <Input type="number" placeholder="Mint DYAD" />
          <Button>MAX</Button>
        </div>

        <div className="redeem-section flex space-x-2">
          <Input type="number" placeholder="Redeem DYAD" />
          <Button>MAX</Button>
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {[{ id: "test" }].map((vault) => (
          <div key={vault.id} className="flex justify-between py-2 border-t">
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline">±</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  {/* ... (Your provided design for the Deposit/Withdraw popover) ... */}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}

        {Array(5)
          .fill(null)
          .map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="flex justify-center py-2 border-t"
            >
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline">+</Button>
                </PopoverTrigger>
                <PopoverContent>
                  {[{ id: "test", name: "test" }].map((vault) => (
                    <Button key={vault.id}>{vault.name}</Button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          ))}
        <div className="claim-section">
          <Button>Claim Bonus</Button>
        </div>
      </div>
    </>
  );
}
