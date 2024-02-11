import React from "react";
import NoteCardsContainer from "../reusable/NoteCardsContainer";
import TabsComponent from "../reusable/TabsComponent";
import { TABS_MOCK_DATA } from "@/mockData/tabsMockData";

function NoteCard() {
  return (
    <NoteCardsContainer>
      <TabsComponent
        tabsData={TABS_MOCK_DATA}
        // logo={<div className="">TEST</div>}
      />
    </NoteCardsContainer>
  );
}

export default NoteCard;
