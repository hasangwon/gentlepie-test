import { useState } from "react";
import useInquiryApi from "./useInquiryApi";
import { useRecoilState } from "recoil";
import { painAreaState } from "@/store/painAreaState";
import { formatPainArea } from "@/utils/formatText";

const useInquiry = () => {
  const { sendMessage, sendMessageStream } = useInquiryApi();
  const [painArea, setPainArea] = useRecoilState(painAreaState);
  const [inputValue, setInputValue] = useState("");
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const [botMessage, setBotMessage] = useState(
    "문진을 시작하겠습니다.\n저에게 말씀하신 모든 내용이 ‘원장님’께 전달됩니다.\n차근차근 말씀해 주세요.\n\n어느 부위에 통증이 있으신가요?"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState("");

  const handleSendMessage = async (userMessage: string) => {
    if (userMessage.trim() === "") return;

    setInputValue("");
    setIsLoading(true);
    setUserMessages((prev) => [...prev, userMessage]);
    setBotMessage("");

    try {
      const response = await sendMessage(
        userMessage,
        threadId,
        formatPainArea(painArea)
      );
      setBotMessage(response?.text);
      setThreadId(response?.threadId || "");
    } catch (error) {
      console.error("Failed to fetch bot response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessageStream = async (userMessage: string) => {
    if (userMessage.trim() === "") return;

    setInputValue("");
    setIsLoading(true);
    setUserMessages((prev) => [...prev, userMessage]);
    setBotMessage("");

    try {
      await sendMessageStream(
        userMessage,
        threadId,
        formatPainArea(painArea),
        (string) => {
          setBotMessage((prev) => prev + string);
        },
        (savedThreadId) => {
          setThreadId(savedThreadId || "");
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error("Failed to fetch bot response:", error);
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
    handleSendMessageStream,
    threadId,
    setThreadId,
    setUserMessages,
  };
};

export default useInquiry;
