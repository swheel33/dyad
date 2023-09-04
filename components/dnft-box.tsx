import { useState } from "react";
import { Label } from "@radix-ui/react-label";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
  const [selectedTab, setSelectedTab] = useState<"mint" | "burn">("mint");

  return (
    <div className="container mx-auto p-4">
      {/* Select dNFT */}
      <Label className="text-sm">
        Select dNFT
        <Select>
          <SelectTrigger id="select-dnft" className="mt-1">
            <SelectValue placeholder="Select dNFT" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dnft1">dNFT 1</SelectItem>
            <SelectItem value="dnft2">dNFT 2</SelectItem>
          </SelectContent>
        </Select>
      </Label>

      {/* Tabs */}
      <div className="my-4 flex space-x-4 ">
        <Button
          variant={selectedTab === "mint" ? "default" : "outline"}
          onClick={() => {
            setSelectedTab("mint");
          }}
        >
          Mint & Deposit
        </Button>
        <Button
          variant={selectedTab === "burn" ? "default" : "outline"}
          onClick={() => {
            setSelectedTab("burn");
          }}
        >
          Burn & Withdraw
        </Button>
      </div>

      {selectedTab === "mint" ? (
        <MintAndDepositTab setSelectedVault={(test: string) => test} />
      ) : (
        <BurnAndWithdrawTab setSelectedVault={(test: string) => test} />
      )}

      {/* Persistent dNFT Data Block */}
      <div className="mt-4 border p-4">
        <h2 className="text-xl mb-2">dNFT Data</h2>
        <p className="text-sm text-muted-foreground">
          DYAD minted: <span className="text-foreground">10</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Collateral value: <span className="text-foreground">$100</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Collateral Ratio: <span className={crColor(90)}>90%</span>
        </p>

        <h2 className="text-xl mt-4 mb-2">Vault Shares Data Table</h2>
        <Table className="w-full border">
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
