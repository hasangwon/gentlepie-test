import React from "react";
import Image from "next/image";
import CloseButton from "../../common/Svg/CloseButton";

const Header = ({
  title,
  handleEndModal,
  pageIndex,
}: {
  title: string;
  handleEndModal: (isOpen: boolean) => void;
  pageIndex: number;
}) => {
  return (
    <header className="absolute top-0 w-full flex justify-center p-4 bg-white border-b border-gentle-light z-20">
      <div
        className="text-lg font-bold bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(80.64deg, #000AFF -7.86%, #838BFF 43.81%, #00BD65 106.97%)",
        }}
      >
        {title}
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
