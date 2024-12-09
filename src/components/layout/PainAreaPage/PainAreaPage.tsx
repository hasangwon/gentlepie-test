/* eslint-disable @next/next/no-img-element */
import React from "react";
import ContentContainer, { Content } from "../../common/atom/ContentContainer";
import { BASE_PATH, painDescription, painTitle } from "@/utils/constants";

const PainAreaPage = ({
  painAreas,
  handlePainArea,
}: {
  painAreas: string[];
  handlePainArea: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <div
      className={`relative w-full h-full z-10 overflow-y-auto mt-[3.75rem] responsive_height`}
    >
      <div
        className={`text-center flex-col select-none whitespace-pre-wrap pt-4 min-h-[40rem]`}
      >
        <div className="text-lg mb-4">{painDescription}</div>
        <p className="text-3xl font-semibold leading-10">{painTitle}</p>

        <div className="overflow-y-auto">
          <div className="py-4 px-8 flex flex-col items-center mt-4 gap-4 bg-[rgba(229,255,223,0.3)] mb-4 h-full">
            {painAreas.map((area, index) => (
              <button
                key={index}
                value={area}
                onClick={handlePainArea}
                className="text-lg font-semibold w-[15rem] h-[3rem] bg-white border py-2 rounded-lg hover:bg-primary hover:text-white"
              >
                {area}
              </button>
            ))}
          </div>
        </div>
        <div className="fixed bottom-[-8rem] left-[-4rem] w-[60%] min-w-[15rem] max-w-[30rem] h-auto z-[-10]">
          <img
            src={`${BASE_PATH}/gradient_circle.svg`}
            alt="logo"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PainAreaPage;
