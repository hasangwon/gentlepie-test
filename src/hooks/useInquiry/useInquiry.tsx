import { useState } from "react";
import useInquiryApi from "./useInquiryApi";

const useInquiry = () => {
  const { sendMessage } = useInquiryApi();
  const [inputValue, setInputValue] = useState("");
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const [botMessage, setBotMessage] = useState(
    "문진을 시작하겠습니다.\n저에게 말씀하신 모든 내용이 ‘원장님’께 전달됩니다.\n차근차근 말씀해 주세요.\n\n어느 부위에 통증이 있으신가요?"
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
