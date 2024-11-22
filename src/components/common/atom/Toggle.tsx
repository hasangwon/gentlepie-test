import React from "react";

const Toggle = ({
  on,
  onToggle,
  leftContent,
  rightContent,
}: {
  on: boolean;
  onToggle: () => void;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) => {
  return (
    <div
      className="absolute right-6 top-0 w-[76px] h-10 flex items-center rounded-full py-2 px-0 border border-white bg-transparent cursor-pointer mr-6 mt-4"
      onClick={onToggle}
    >
      <div
        className={`flex-1 flex justify-center items-center text-center text-sm z-10 select-none ${
          on
            ? "text-white "
            : "text-primary  transition-all ease-linear duration-500"
        }`}
      >
        {leftContent}
      </div>
      <div
        className={`flex-1 flex justify-center items-center text-center text-sm z-10 select-none ${
          on
            ? "text-primary  transition-all ease-linear duration-500"
            : "text-white"
        }`}
      >
        {rightContent}
      </div>
      <div
        className={`absolute top-1 left-2 w-[30px] h-[30px] bg-white rounded-full shadow-md transform duration-300 ${
          on ? "translate-x-[32px]" : "translate-x-[-4px]"
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
