import { useState, useEffect } from "react";
import { MessageType } from "@/types/messageType";
import { sendMessage, rateResponse } from "@/pages/api/chat";

const useChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const welcomeMessage: MessageType = {
      id: Date.now().toString(),
      sender: "bot",
      timestamp: Date.now(),
      type: "buttonList",
      content: "안녕하세요! 무엇을 도와드릴까요?",
      buttons: ["예시 질문 1", "예시 질문 2"],
      url: { link: "https://www.google.com", text: "구글로 이동"}
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleExampleQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage(question);
  };

  const handleSendMessage = async (messageContent: string) => {
    if (messageContent.trim() === "" || loading) return;

    const newMessage: MessageType = {
      id: Date.now().toString(),
      sender: "user",
      timestamp: Date.now(),
      type: "text",
      content: messageContent,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const botResponse = await sendMessage(messageContent);
      console.log(botResponse,'asd')
      setMessages((prevMessages) => [...prevMessages, botResponse]);
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

  return {
    messages,
    inputValue,
    setInputValue,
    loading,
    handleSendMessage,
    handleExampleQuestion,
    handleRateResponse,
  };
};

export default useChat;
