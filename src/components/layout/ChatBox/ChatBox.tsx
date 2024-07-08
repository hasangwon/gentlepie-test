import { MessageType } from "@/types/messageType";
import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatMessageLLM from "./ChatMessageLLM";

type ChatBoxProps = {
  messages: MessageType[];
  loading: boolean;
  onButtonClick: (buttonText: string) => void;
  regenerateMessage: (message: MessageType) => void;
};

const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  loading,
  onButtonClick,
  regenerateMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto p-4">
      {messages.map((message, index) => (
        <ChatMessage
          key={`${message.id}_${index}`}
          index={index}
          message={message}
          onButtonClick={onButtonClick}
          regenerateMessage={regenerateMessage}
          scrollToBottom={scrollToBottom}
        />
      ))}
      {loading && (
        <ChatMessageLLM
          message={{
            id: "load",
            sender: "bot",
            content: "챗봇이 입력중입니다.",
            timestamp: Date.now(),
            type: "loading",
          }}
          scrollToBottom={scrollToBottom}
          isTyping={false}
        />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;
