import React from "react";
import { NoteNumberDataColumnModel } from "@/models/NoteCardModels";
import { PIE_CHART_MOCK_DATA } from "@/mockData/tabsMockData";
import PieChartComponent from "@/components/reusable/PieChartComponent";

interface NoteNumberProps {
  data: NoteNumberDataColumnModel[];
}

const NoteNumber: React.FC<NoteNumberProps> = ({ data }) => {
  return (
    <div className="flex justify-between">
      <div className="flex justify-between w-full text-[#FAFAFA] px-3.5">
        <div className="w-[295px] justify-center mt-[20px]">
          <div className="w-[175px] m-auto">
            <PieChartComponent data={PIE_CHART_MOCK_DATA} />
          </div>
        </div>
        <div className="mt-[27px]">
          {data.map((item: any, index: number) => (
            <div
              key={index}
              className={`flex w-60 justify-between mb-[25px] text-sm ${
                item.highlighted ? "text-[#FAFAFA]" : "text-[#A1A1AA]"
              }`}
            >
              <div>{item.text}</div>
              <div className="text-right">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NoteNumber;
