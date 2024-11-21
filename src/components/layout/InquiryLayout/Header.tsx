import React from "react";
import Image from "next/image";

const Header = ({
  title,
  titleStyle,
}: {
  title: string;
  titleStyle?: string;
}) => {
  return (
    <header className="relative w-full flex justify-center p-4 bg-white border-b border-gentle-light z-20">
      <button
        className="absolute left-4 top-4 text-white"
        onClick={() => {
          window.location.reload();
        }}
      >
        <Image src="/inquiry_refresh.svg" alt="logo" width={24} height={24} />
      </button>
      <div
        className="text-lg font-bold bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(80.64deg, #000AFF -7.86%, #838BFF 43.81%, #00BD65 106.97%)",
        }}
      >
        {title}
      </div>
    </header>
  );
};

export default Header;
