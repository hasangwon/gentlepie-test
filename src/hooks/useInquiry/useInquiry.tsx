import { useState } from "react";
import useInquiryApi from "./useInquiryApi";

const useInquiry = () => {
  const { sendMessage } = useInquiryApi();
  const [inputValue, setInputValue] = useState("");
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const [botMessage, setBotMessage] = useState(
    "안녕하세요!\n 증상을 말씀해주세요."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState("");

  const handleSendMessage = async (userMessage: string) => {
    if (userMessage.trim() === "") return;

    setUserMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage, threadId);
      setBotMessage(response?.text || "다시 입력해주세요.");
      setThreadId(response?.threadId || "");
    } catch (error) {
      console.error("Failed to fetch bot response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inputValue,
    setInputValue,
    userMessages,
    botMessage,
    isLoading,
    handleSendMessage,
  };
};

export default useInquiry;
