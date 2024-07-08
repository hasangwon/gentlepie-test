import { MessageType } from "@/types/messageType";
import React from "react";

const WelcomeMessage = ({ message }: { message: MessageType }) => {
  if (message.sender) {
    return (
      <div className="flex">
        <div className="flex">
          <div className="border-primary border-[1.5px] text-primary rounded-full w-6 h-6 flex justify-center items-center mr-2">
            C
          </div>

          <div className="bg-neutral-light bg-neutral-100 rounded-xl p-4">
            {message.content}
          </div>
        </div>
      </div>
    );
  }
  return <div className="">{"error"}</div>;
};

export default WelcomeMessage;
