import React, { useRef, useEffect, useState } from "react";
import { MessageType } from "@/types/messageType";
import ChatMessage from "../ChatMessage";
import ChatLoadingView from "./ChatLoadingView";

const ChatBox = ({
  messages,
  loading,
  className = "",
}: {
  messages: MessageType[];
  loading: boolean;
  className?: string;
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className={`flex-grow overflow-y-auto py-6 pr-6 pl-3 ${className}`}>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
          index={index}
          scrollToBottom={scrollToBottom}
        />
      ))}
      {loading && <ChatLoadingView />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;
