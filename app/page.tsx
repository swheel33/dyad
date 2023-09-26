"use client";

import { Separator } from "@/components/ui/separator";
import ClaimSection from "@/components/claim-section";
import DnftBox from "@/components/dnft-box";

export default function Home() {
  return (
    <div className="flex-1 max-w-screen-md p-4 ">
      <h3 className="text-md font-medium leading-loose pt-3 px-4">
        Immutable Base. Infinite Possibility.
      </h3>
      <p className="text-sm leading-loose text-muted-foreground py-2 px-4">
        DYAD unlocks unprecedented DeFi opportunities.
      </p>
      <Separator className="my-4" />
      <ClaimSection />
      <Separator className="my-4" />
      <DnftBox />
    </div>
  );
}
