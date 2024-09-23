import React from "react";

const MessageContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;

  className?: string;
}) => {
  return (
    <div className={`flex ${className} mb-4`}>
      <div className="w-4 h-4 bg-red-400 rounded-full mr-2 mt-1"></div>
      <div className={`relative rounded-2xl bg-white px-4 py-2`}>
        {children}
      </div>
    </div>
  );
};

export default MessageContainer;
