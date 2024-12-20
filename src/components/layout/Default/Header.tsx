import React from "react";
import CloseButton from "../../common/Svg/CloseButton";
import { chatbotName } from "@/utils/constants";

const Header = ({
  handleEndModal,
  pageIndex,
}: {
  handleEndModal: (isOpen: boolean) => void;
  pageIndex: number;
}) => {
  return (
    <header className="absolute top-0 w-full flex justify-center p-4 bg-white border-b border-gentle-light z-50">
      <div
        className="text-[21px] tracking-[-0.5%] letter font-bold bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #04097F 0%, #838BFF 45%, #006E76 100%)",
        }}
      >
        {chatbotName}
      </div>
      {pageIndex > 2 && pageIndex !== 5 && (
        <button
          onClick={() => handleEndModal(true)}
          className="absolute top-4 right-4"
        >
          <CloseButton />
        </button>
      )}
    </header>
  );
};

export default Header;
