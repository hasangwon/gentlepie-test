import React, { useState } from "react";
import Header from "../components/Header/Header";
import MessageBox from "../components/MessageBox/MessageBox";
import MessageInput from "../components/MessageInput/MessageInput";
import { MessageType } from "@/types/messageType";
import { rateResponse, sendMessage } from "./api/chat";

const IndexPage: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || loading) return;

    const newMessage: MessageType = {
      id: Date.now().toString(),
      sender: "user",
      timestamp: Date.now(),
      type: "text",
      content: inputValue,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const botResponse = await sendMessage(inputValue);

      const botMessage: MessageType = {
        id: botResponse.id,
        sender: "bot",
        timestamp: Date.now(),
        type: botResponse.type,
        content: botResponse.content,
        buttons: botResponse.buttons,
        menu: botResponse.menu,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Failed to fetch bot response:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRateResponse = async (
    responseId: string,
    rating: "like" | "dislike"
  ) => {
    try {
      await rateResponse(responseId, rating);
      console.log(`Response ${responseId} rated as ${rating}`);
    } catch (error) {
      console.error("Failed to rate response:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <MessageBox messages={messages} loading={loading} />
      <MessageInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        loading={loading}
      />
    </div>
  );
};

export default IndexPage;
