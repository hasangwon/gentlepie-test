import { MessageType } from "@/types/messageType";
import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

type MessageBoxProps = {
  messages: MessageType[];
  loading: boolean;
  onButtonClick: (buttonText: string) => void;
};

const MessageBox: React.FC<MessageBoxProps> = ({
  messages,
  loading,
  onButtonClick,
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
      {messages.map((message, idx) => (
        <ChatMessage
          key={`${message.id}_${idx}`}
          message={message}
          onButtonClick={onButtonClick}
        />
      ))}
      {loading && (
        <div className="flex gap-4 items-start m-4">
          <div className="w-4 h-4 mt-1 rounded-full bg-red-100 " />
          챗봇이 타이핑 중입니다...
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageBox;