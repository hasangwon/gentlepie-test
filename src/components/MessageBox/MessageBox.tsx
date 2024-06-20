import { MessageType } from "@/types/messageType";
import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

type MessageBoxProps = {
  messages: MessageType[];
  loading: boolean;
};

const MessageBox: React.FC<MessageBoxProps> = ({ messages, loading }) => {
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
      {messages.map((message, idx) => {
        return <ChatMessage key={`${message.id}_${idx}`} message={message} />;
      })}
      {loading && (
        <div className="typing-indicator">챗봇이 타이핑 중입니다...</div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageBox;
