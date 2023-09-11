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
import BurnAndWithdrawTab from "./burn-and-withdraw-tab";
import { crColor } from "@/lib/utils";

export default function DnftBox() {
  return (
    <div className="container mx-auto p-4">
      {/* Select dNFT */}
      <Select>
        <SelectTrigger id="select-dnft" className="mt-1">
          <SelectValue placeholder="Select dNFT" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dnft1">dNFT 1</SelectItem>
          <SelectItem value="dnft2">dNFT 2</SelectItem>
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
          DYAD minted: <span className="text-foreground">10</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Collateral value: <span className="text-foreground">$100</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Collateral Ratio: <span className={crColor(90)}>90%</span>
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
            {[{ vault: "ETH", totalValue: 1000, share: "10%", value: 100 }].map(
              (data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.vault}</TableCell>
                  <TableCell>${data.totalValue}</TableCell>
                  <TableCell>{data.share}</TableCell>
                  <TableCell>${data.value}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
