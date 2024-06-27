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
      botResponse.question = messageContent;
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

  const regenerateMessage = async (message: MessageType) => {
    if (message.question === undefined) return;
    console.log(message,'asd')

    const messageIndex = messages.findIndex((msg) => msg.id + msg.timestamp === message.id + message.timestamp);

    if (messageIndex === -1) return;

    // 로딩 상태를 메시지 위치에 삽입
    const updatedMessages = [...messages];
    updatedMessages[messageIndex] = {
      ...updatedMessages[messageIndex],
      content: "챗봇이 타이핑 중입니다...",
      type: "loading", // 타입을 로딩으로 변경
    };
    setMessages(updatedMessages);

    try {
      const botResponse = await sendMessage(message.question);

      const newBotMessage: MessageType = {
        id: botResponse.id,
        sender: "bot",
        timestamp: Date.now(),
        type: botResponse.type,
        content: botResponse.content,
      };
      console.log(newBotMessage,'asd')

      updatedMessages[messageIndex] = newBotMessage;
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Failed to fetch bot response:", error);
    } finally {
      setLoading(false);
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
    regenerateMessage,
  };
};

export default useChat;
