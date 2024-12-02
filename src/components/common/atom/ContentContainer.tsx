import React from "react";

const ContentContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative w-full h-full flex flex-col justify-center items-center z-10  mt-[3.75rem] ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentContainer;

export const Content = ({
  children,
  title,
  className = "h-[32rem] w-full",
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={`${className} text-center flex-col select-none whitespace-pre-wrap pt-4`}
    >
      <p className="text-[29px] font-semibold leading-10 px-6">{title}</p>
      {children}
    </div>
  );
};
