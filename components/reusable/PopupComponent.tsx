import React, { ReactNode } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { COLORS } from "@/constants/styles";

interface PopupComponentProps {
  placement?: any;
  trigger: ReactNode;
  content: ReactNode;
}

const PopupComponent: React.FC<PopupComponentProps> = ({
  placement = "bottom-end",
  trigger,
  content,
}) => {
  return (
    <Popover
      placement={placement}
      classNames={{
        content: [`bg-[#09090B] rounded-lg border border-[${COLORS.WHITE}]`],
      }}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
};

export default PopupComponent;
