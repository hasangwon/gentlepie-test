import { MessageType } from "@/types/messageType";
import React from "react";
import ChatMessageUser from "./ChatMessageUser";
import ChatMessageLLM from "./ChatMessageLLM";

const ChatMessage = ({
  message,
  index,
  scrollToBottom,
}: {
  message: MessageType;
  index: number;
  scrollToBottom: () => void;
}) => {
  return (
    <div className={`relative flex`}>
      <div className={`relative group w-full`}>
        <div className="relative w-full overflow-y-auto overflow-x-hidden">
          {(() => {
            switch (message.sender) {
              case "bot":
                return (
                  <>
                    <ChatMessageLLM
                      message={message}
                      scrollToBottom={scrollToBottom}
                    />
                  </>
                );
              case "user":
                return <ChatMessageUser message={message} index={index} />;
              case "stop":
                return <div>stop</div>;
              case "error":
              default:
                return <div>error</div>;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
