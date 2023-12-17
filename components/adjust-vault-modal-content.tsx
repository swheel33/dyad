import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface Props {
  vault: {
    id: string;
  };
}

export default function AdjustVaultModalContent({ vault }: Props) {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      <CardTitle className="text-lg mb-2">Adjust vault</CardTitle>
      <RadioGroup defaultValue="deposit" className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="deposit" id="deposit" />
          <Label htmlFor="deposit" className="cursor-pointer">
            Deposit {vault.id}
          </Label>
        </div>
        <div className="flex space-x-2">
          <Input type="number" placeholder="Deposit" />
          <Button variant="secondary">MAX</Button>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="withdraw" id="withdraw" />
          <Label htmlFor="withdraw" className="cursor-pointer">
            Withdraw {vault.id}
          </Label>
        </div>
        <div className="flex space-x-2">
          <Input type="number" placeholder="Withdraw" />
          <Button variant="secondary">MAX</Button>
        </div>
        <p className="text-sm whitespace-nowrap">
          CR: <span>10.00%</span> <ArrowRightIcon className="inline w-3 h-3" />{" "}
          <span>90.00%</span>
        </p>
        <div className="pt-2 w-full">
          <Button className="w-full">CONFIRM</Button>
        </div>
      </RadioGroup>
    </div>
  );
}
