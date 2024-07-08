import { MessageType } from "@/types/messageType";
import React from "react";
import ChatMessageLLM from "./ChatMessageLLM";
import ChatMessageWelcome from "./ChatMessageWelcome";

type ChatMessageProps = {
  message: MessageType;
  index: number;
  onButtonClick: (buttonText: string) => void;
  regenerateMessage: (message: MessageType) => void;
  scrollToBottom: () => void;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  index,
  onButtonClick,
  regenerateMessage,
  scrollToBottom,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    alert("Message copied to clipboard");
  };

  return (
    <div className={`relative flex`}>
      <div className={`relative group w-full`}>
        <div className="relative w-full overflow-y-auto">
          {(() => {
            if (index === 0) {
              return <ChatMessageWelcome message={message} />;
            }
            switch (message.sender) {
              case "user":
                // case "RAG":
                return (
                  <div className="flex mt-6 w-full justify-end">
                    <div className="p-4 rounded-lg bg-neutral-100">
                      {message.content}
                    </div>
                  </div>
                );
              case "bot":
                return (
                  <ChatMessageLLM
                    message={message}
                    scrollToBottom={scrollToBottom}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
