import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { TabsDataModel } from "@/models/TabsModel";

interface tabsComponentPropsInterface {
  tabsData: TabsDataModel[];
}

export default function TabsComponent({
  tabsData,
}: tabsComponentPropsInterface) {
  return (
    <div className="w-full px-0.5">
      <Tabs
        variant="underlined"
        aria-label="Tabs variants"
        className="p-0 w-full"
        classNames={{
          tabList: `justify-between w-full relative rounded-none p-0 border-b border-divider`,
          cursor: "w-full bg-[#FAFAFA]",
          tab: "max-w-fit h-12 font-semibold",
        }}
      >
        {tabsData.map((tab: any) => (
          <Tab key={tab.tabKey} title={tab.label}>
            {tab.content}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
