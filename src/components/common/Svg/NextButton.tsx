import React from "react";

const NextButton = ({ isActive }: { isActive: boolean }) => {
  return isActive ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="31.8657" y="1.25351" width="43.2922" height="43.2922" rx="21.6461" transform="rotate(45 31.8657 1.25351)" fill="url(#paint0_linear_252_1839)" />
      <rect x="31.8657" y="1.25351" width="43.2922" height="43.2922" rx="21.6461" transform="rotate(45 31.8657 1.25351)" stroke="white" strokeWidth="1.77273" />
      <path d="M31.8657 23L40.7314 31.8664L31.8657 40.7321" stroke="white" strokeWidth="1.77273" strokeLinecap="round" />
      <path d="M23 31.8657H40.7314" stroke="white" strokeWidth="1.77273" strokeLinecap="round" />
      <defs>
        <linearGradient id="paint0_linear_252_1839" x1="41.8602" y1="26.068" x2="74.0335" y2="23.5931" gradientUnits="userSpaceOnUse">
          <stop stopColor="#51E9A2" />
          <stop offset="1" stopColor="#006E76" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="31.8657" y="1.25351" width="43.2922" height="43.2922" rx="21.6461" transform="rotate(45 31.8657 1.25351)" fill="url(#paint0_linear_252_1705)" />
      <rect x="31.8657" y="1.25351" width="43.2922" height="43.2922" rx="21.6461" transform="rotate(45 31.8657 1.25351)" stroke="white" strokeWidth="1.77273" />
      <path d="M31.8657 23L40.7314 31.8664L31.8657 40.7321" stroke="white" strokeWidth="1.77273" strokeLinecap="round" />
      <path d="M23 31.8657H40.7314" stroke="white" strokeWidth="1.77273" strokeLinecap="round" />
      <defs>
        <linearGradient id="paint0_linear_252_1705" x1="41.8602" y1="26.068" x2="74.0335" y2="23.5931" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CACACA" />
          <stop offset="1" stopColor="#8F8F8F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default NextButton;
