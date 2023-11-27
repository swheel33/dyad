"use client";

import { Separator } from "@/components/ui/separator";
import DnftBox from "@/components/dnft-box";

export default function Home() {
  return (
    <div className="flex-1 max-w-screen-md p-4 w-full">
      <h3 className="text-md font-medium leading-loose pt-3">
        Immutable Base. Infinite Possibility.
      </h3>
      <p className="text-sm leading-loose text-muted-foreground py-2">
        Use your Note to deposit collateral and mint DYAD <br />
        The longer you keep your collateral deposited the more it will grow,
        enabling you to mint DYAD for less
      </p>
      <div>
        <Separator className="my-4" />
      </div>
      <DnftBox />
    </div>
  );
}
