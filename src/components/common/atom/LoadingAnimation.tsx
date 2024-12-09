import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BASE_PATH, doctorName } from "@/utils/constants";

const LoadingAnimation = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center pt-6 pb-6">
        <Image
          src={`${BASE_PATH}/bot_profile.png`}
          width={57}
          height={57}
          alt="doctor"
        />
        <h3 className="text-xs text-gentle-dark mt-1">{doctorName}</h3>
      </div>
      <div className="flex gap-2">
        <div className="bar w-2 h-12 bg-[rgba(74,80,180,0.2)] relative overflow-hidden rounded-[4px]">
          <div className="dot bg-[#4A50B4]" />
        </div>
        <div className="bar w-2 h-12 bg-[rgba(115,122,234,0.2)] relative overflow-hidden rounded-[4px]">
          <div className="dot bg-[#737AEA]" />
        </div>
        <div className="bar w-2 h-12 bg-[rgba(66,136,170,0.2)] relative overflow-hidden rounded-[4px]">
          <div className="dot bg-[#4288AA]" />
        </div>
        <div className="bar w-2 h-12 bg-[rgba(30,133,124,0.2)] relative overflow-hidden rounded-[4px]">
          <div className="dot bg-[#1E857C]" />
        </div>
        <div className="bar w-2 h-12 bg-[rgba(0,112,87,0.2)] relative overflow-hidden rounded-[4px]">
          <div className="dot bg-[#007057]" />
        </div>
      </div>
      {showMessage ? (
        <p className="h-[5rem] text-base text-[#B3B3B3] text-center">
          답변을 이해하는 데<br />
          시간이 조금 걸리고 있어요.
        </p>
      ) : (
        <div className="h-[5rem] " />
      )}
    </div>
  );
};

export default LoadingAnimation;
