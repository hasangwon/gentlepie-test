import React from "react";

const ChatMessageUser = ({
  message,
  index,
}: {
  message: any;
  index: number;
}) => {
  return (
    <div className={`flex justify-end mb-4`}>
      <div className="text-xl font-semibold leading-[30px] bg-white py-2 px-4 rounded-2xl">
        {message.content}
      </div>
      <div className="w-4 h-4 bg-blue-400 rounded-full ml-2 mt-1" />
    </div>
  );
};

export default ChatMessageUser;
