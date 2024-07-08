import React from "react";

const Header = () => {
  return (
    <header className="relative w-full animated-gradient flex justify-center p-4">
      <button
        className="absolute left-4 top-4"
        onClick={() => {
          window.location.reload();
        }}
      >
        새로고침
      </button>
      <div className="font-bold text-[18px] leading-[22px] tracking-[0.1rem] text-white">
        COS-BOT
      </div>
    </header>
  );
};

export default Header;
