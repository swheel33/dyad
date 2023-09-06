import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  setSelectedVault: (value: string) => void;
}

export default function MintAndDepositTab({ setSelectedVault }: Props) {
  const [oldCR, setOldCR] = useState(0);
  const [newCR, setNewCR] = useState(0);

  return (
    <div>
      {/* Deposit Component */}
      <div className="mb-4 p-4 border">
        <Select>
          <SelectTrigger className="mt-1 mb-4">
            <SelectValue placeholder="Select Vault" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dnft1">Vault 1</SelectItem>
            <SelectItem value="dnft2">Vault 2</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Amount to Deposit"
            className="w-full p-2 border mb-2"
            onChange={(e) => setNewCR(oldCR + parseInt(e.target.value))}
          />
          <Button
            className="p-2 border bg-gray-200"
            onClick={() => setNewCR(oldCR + 100)}
          >
            MAX
          </Button>
        </div>
        <p className="text-green-500 text-xs">
          Old CR: {oldCR}% -&gt; New CR: {newCR}%
        </p>
        <Button className="mt-4 p-2" variant="default">
          Deposit [collateral]
        </Button>
      </div>

      {/* Mint Component */}
      <div className="mb-4 p-4 border">
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Amount to Mint"
            className="w-full p-2 border mb-2"
            onChange={(e) => setNewCR(oldCR + parseInt(e.target.value))}
          />
          <Button
            className="p-2 border bg-gray-200"
            onClick={() => setNewCR(oldCR + 100)}
          >
            MAX
          </Button>
        </div>
        <p className="text-green-500 text-xs">
          Old CR: {oldCR}% -&gt; New CR: {newCR}%
        </p>
        <Button className="mt-4 p-2" variant="default">
          Mint DYAD
        </Button>
      </div>
    </div>
  );
}
