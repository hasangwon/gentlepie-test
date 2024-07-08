import React from "react";

const Header = () => {
  return (
    <header className="relative w-full flex justify-center p-4 bg-gray-400">
      <button
        className="absolute left-4 top-4 text-white"
        onClick={() => {
          window.location.reload();
        }}
      >
        새로고침
      </button>
      <div className="font-bold text-[18px] leading-[22px] tracking-[0.1rem] text-white">
        테스트 챗봇
      </div>
    </header>
  );
};

export default Header;
