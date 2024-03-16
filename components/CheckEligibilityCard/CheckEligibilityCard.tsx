import React, { useState } from "react";
import ButtonComponent from "../reusable/ButtonComponent";
import InputComponent from "../reusable/InputComponent";
import NoteCardsContainer from "../reusable/NoteCardsContainer";

interface CheckEligibilityCardProps {}

const CheckEligibilityCard: React.FC<CheckEligibilityCardProps> = ({}) => {
  const [walletAdresses, setWalletAddresses] = useState("");
  const [checkedData, setCheckedData] = useState([
    {
      walletAddress: "0xCAD2EaDA97Ad393584Fe84A5cCA1ef3093E45ae4",
      keroseneEarned: "1200",
    },
  ]);
  const onCheckHandler = () => {
    setCheckedData((prevState: any) => [
      ...prevState,
      ...walletAdresses.split(" ").map((address: string) => ({
        walletAddress: address,
        keroseneEarned: "1200",
      })),
    ]);
  };
  return (
    <NoteCardsContainer height="339px">
      <div className="text-sm font-semibold text-[#A1A1AA]">
        <div className="flex justify-between w-full">
          <div className="w-full">
            <InputComponent
              placeHolder={`Enter one or more wallet addresses separated by a space or enter `}
              value={walletAdresses}
              onValueChange={setWalletAddresses}
            />
          </div>
          <div className="w-[101px] ml-[30px]">
            <ButtonComponent onClick={onCheckHandler}>Check</ButtonComponent>
          </div>
        </div>
        <div className="w-full w-full">
          <div className="flex justify-between mt-[43px] pb-[43px] text-sm text-[#FAFAFA]">
            <div>Address</div>
            <div>Kerosene earned</div>
          </div>
          <div
            style={{
              width: "calc(100% + 12px)",
              height: "150px",
              overflow: "auto",
              paddingRight: "15px",
            }}
          >
            {checkedData.map((data: any) => (
              <div
                key={data.walletAddress}
                className="flex justify-between mb-[43px] text-sm text-[#FAFAFA]"
              >
                <div className="font-normal">{data.walletAddress}</div>
                <div>{data.keroseneEarned}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </NoteCardsContainer>
  );
};
export default CheckEligibilityCard;
