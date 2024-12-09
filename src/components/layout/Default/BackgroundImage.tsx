/* eslint-disable @next/next/no-img-element */
import { BASE_PATH } from "@/utils/constants";
import React from "react";

const BackgroundImage = () => {
  return (
    <div className="absolute top-[-4rem] right-0 w-[50%] min-w-[16rem] max-w-[26rem] h-auto">
      <img
        src={`${BASE_PATH}/gradient_circle.svg`}
        alt="logo"
        className="w-full h-auto"
      />
    </div>
  );
};

export default BackgroundImage;
