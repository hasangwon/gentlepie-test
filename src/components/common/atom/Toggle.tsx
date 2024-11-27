import React from "react";

const Toggle = ({ className = "bg-transparent", on, onToggle, leftContent, rightContent, test }: { className?: string; on: boolean; onToggle: () => void; leftContent: React.ReactNode; rightContent: React.ReactNode; test?: boolean }) => {
  return (
    <div className={`${className} absolute right-6 top-0 w-[76px] h-10 flex items-center rounded-full py-2 px-0 border border-white cursor-pointer mr-6 mt-4`} onClick={onToggle}>
      <div className={`flex-1 flex justify-center items-center text-center text-sm z-10 select-none ${on ? "text-white " : "text-primary  transition-all ease-linear duration-500"}`}>{leftContent}</div>
      <div className={`flex-1 flex justify-center items-center text-center text-sm z-10 select-none ${on ? "text-primary  transition-all ease-linear duration-500" : "text-white"}`}>{rightContent}</div>
      <div className={`absolute top-1 left-2 w-[30px] h-[30px] bg-white rounded-full shadow-md transform duration-300 ${on ? "translate-x-[32px]" : "translate-x-[-4px]"}`}></div>
      {className == "bg-transparent" && (
        <p className="w-[13rem] text-sm absolute left-[-6rem] top-[3rem] text-white border p-1">
          테스트 중입니다
          <br />
          음성 모드 시, 스트리밍 답변
          <br />
          텍스트 모드 시, 일반 답변 API 사용
        </p>
      )}
    </div>
  );
};

export default Toggle;
