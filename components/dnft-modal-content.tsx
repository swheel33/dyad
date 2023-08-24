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
          <Button variant="secondary">MAX</Button>
        </div>

        <div className="redeem-section flex space-x-2">
          <Input type="number" placeholder="Redeem DYAD" />
          <Button variant="secondary">MAX</Button>
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
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaults.map(({ id, value, apy, earnings }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>${value}</TableCell>
                <TableCell>{apy}%</TableCell>
                <TableCell>${earnings}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="outline">±</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <RadioGroup defaultValue="deposit" className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="deposit" id="deposit" />
                          <Label htmlFor="deposit" className="cursor-pointer">
                            Deposit
                          </Label>
                        </div>
                        <div className="flex space-x-2">
                          <Input type="number" placeholder="Deposit" />
                          <Button variant="secondary">MAX</Button>
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer">
                          <RadioGroupItem value="withdraw" id="withdraw" />
                          <Label htmlFor="withdraw" className="cursor-pointer">
                            Withdraw
                          </Label>
                        </div>
                        <div className="flex space-x-2">
                          <Input type="number" placeholder="Withdraw" />
                          <Button variant="secondary">MAX</Button>
                        </div>
                        <div className="pt-2 w-full">
                          <Button className="w-full">CONFIRM</Button>
                        </div>
                      </RadioGroup>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
            {new Array(5 - vaults.length).fill(null).map((_, idx) => (
              <TableRow key={`option-${idx}`}>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="outline">+</Button>
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
