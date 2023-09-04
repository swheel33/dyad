import { useState } from "react";
import { Label } from "@radix-ui/react-label";

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

export default function BurnAndWithdrawTab({ setSelectedVault }: Props) {
  const [oldCR, setOldCR] = useState(0);
  const [newCR, setNewCR] = useState(0);

  return (
    <div>
      {/* Burn Component */}
      <div className="mb-4 p-4 border">
        <h2 className="text-xl mb-2">Burn</h2>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Amount to Burn"
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
        <p className="text-red-500 text-xs">
          Old CR: {oldCR}% -&gt; New CR: {newCR}%
        </p>
        <Button className="mt-4 p-2" variant="default">
          Burn DYAD
        </Button>
      </div>

      {/* Vault ComboBox */}

      <Label className="text-sm">
        Select Vault
        <Select>
          <SelectTrigger className="mt-1 mb-4">
            <SelectValue placeholder="Select Vault" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dnft1">Vault 1</SelectItem>
            <SelectItem value="dnft2">Vault 2</SelectItem>
          </SelectContent>
        </Select>
      </Label>

      {/* Withdraw Component */}
      <div className="mb-4 p-4 border">
        <h2 className="text-xl mb-2">Withdraw</h2>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Amount to Withdraw"
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
        <p className="text-red-500 text-xs">
          Old CR: {oldCR}% -&gt; New CR: {newCR}%
        </p>
        <Button className="mt-4 p-2" variant="default">
          Withdraw [collateral]
        </Button>
      </div>
    </div>
  );
}
