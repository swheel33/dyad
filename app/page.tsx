"use client";

import { Separator } from "@/components/ui/separator";
import DnftBox from "@/components/dnft-box";
import TabsComponent from "@/components/reusable/TabsComponent";
import ButtonComponent from "@/components/reusable/ButtonComponent";
import KeroseneCard from "@/components/KeroseneCard/KeroseneCard";

export default function Home() {
  const keroseneCardsData = [
    {
      currency: "ETH - DYAD (Uniswap)",
      APY: "24",
      staked: "390",
      keroseneEarned: "830",
    },
    {
      currency: "DYAD",
      APY: "12",
      staked: "1200",
      keroseneEarned: "500",
    },
  ];
  const manageNotesContent = (
    <>
      <h3 className="text-md font-medium pt-3">
        Immutable Base. Infinite Possibility.
      </h3>
      <p className="text-sm leading-loose text-muted-foreground py-2">
        Deposit wETH into your Notes to mint DYAD. You will be able to claim
        rewards based on how much DYAD you’ve minted once we deploy the next
        layer of contracts. These rewards will make DYAD less expensive to mint,
        which can increase your yield.
      </p>
      <div>
        <Separator className="my-4" />
      </div>
      <DnftBox />
    </>
  );

  const keroseneData = (
    <>
      <div className="mt-12">
        <ButtonComponent>Claim 1,863 Kerosene</ButtonComponent>
      </div>
      {keroseneCardsData.map((card, index) => (
        <div className="mt-6" key={index}>
          <KeroseneCard
            currency={card.currency}
            staked={card.staked}
            APY={card.APY}
            keroseneEarned={card.keroseneEarned}
          />
        </div>
      ))}
    </>
  );

  const tabsData = [
    {
      label: "Manage Notes",
      tabKey: "Manage Notes",
      content: manageNotesContent,
    },
    {
      label: "Earn Kerosene",
      tabKey: "Earn Kerosene",
      content: keroseneData,
    },
  ];

  return (
    <div className="flex-1 max-w-screen-md w-[745px] p-4 mt-4">
      <TabsComponent tabsData={tabsData} />
    </div>
  );
}
