import React from "react";

const MiniVoiceImage = ({ isActive }: { isActive: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 14"
      fill="none"
    >
      <rect
        y="5.29126"
        width="1.65354"
        height="3.47244"
        rx="0.826772"
        fill={isActive ? "black" : "white"}
      />
      <rect
        x="2.92139"
        y="2.97632"
        width="1.65354"
        height="8.10236"
        rx="0.826772"
        fill={isActive ? "black" : "white"}
      />
      <rect
        x="5.84253"
        width="1.65354"
        height="14"
        rx="0.826772"
        fill={isActive ? "black" : "white"}
      />
      <rect
        x="8.76367"
        y="4.18896"
        width="1.65354"
        height="5.67717"
        rx="0.826772"
        fill={isActive ? "black" : "white"}
      />
      <rect
        x="11.6851"
        y="2.42529"
        width="1.65354"
        height="9.09449"
        rx="0.826772"
        fill={isActive ? "black" : "white"}
      />
    </svg>
  );
};

export default MiniVoiceImage;
