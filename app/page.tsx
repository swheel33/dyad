"use client";

import { Separator } from "@/components/ui/separator";
import DnftBox from "@/components/dnft-box";
import TabsComponent from "@/components/reusable/TabsComponent";
import ButtonComponent from "@/components/reusable/ButtonComponent";
import KeroseneCard from "@/components/KeroseneCard/KeroseneCard";
import NoteCard from "@/components/NoteCard/NoteCard";
import filterIcon from "@/public/filterIconPng.png";

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
      <div className="mt-12 mb-6 flex justify-between">
        <ButtonComponent
          styles={{ marginRight: "20px" }}
          onClick={() => console.log("Claim Note")}
        >
          Claim Note Nº 228
        </ButtonComponent>
        <div>
          <ButtonComponent
            styles={{
              width: "40px",
              paddingRight: "0px",
              paddingLeft: "0px",
            }}
            onClick={() => console.log("Filter")}
          >
            <div
              style={{
                width: "15px",
                margin: "auto",
              }}
            >
              <img src={filterIcon.src} />
            </div>
          </ButtonComponent>
        </div>
      </div>
      <NoteCard />
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
