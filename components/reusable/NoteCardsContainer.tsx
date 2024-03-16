import React from "react";

interface NoteCardsContainerPropsInterface {
  children: JSX.Element;
  height?: string;
  width?: string;
}

function NoteCardsContainer({
  children,
  height = "300px",
  width = "700px",
}: NoteCardsContainerPropsInterface) {
  return (
    <div
      className={`flex-1 max-w-screen-md p-7  bg-[#1A1A1A] rounded-[10px]`}
      style={{ height, width }}
    >
      {children}
    </div>
  );
}

export default NoteCardsContainer;
