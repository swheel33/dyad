import React from "react";
import NoteCardsContainer from "../reusable/NoteCardsContainer";
import TabsComponent from "../reusable/TabsComponent";
import { TABS_MOCK_DATA } from "@/mockData/tabsMockData";
import { TabsDataModel } from "@/models/TabsModel";

interface NoteCardProps {
  tabsData: TabsDataModel[];
}

function NoteCard({ tabsData }: NoteCardProps) {
  return (
    <NoteCardsContainer>
      <TabsComponent tabsData={tabsData} />
    </NoteCardsContainer>
  );
}

export default NoteCard;
