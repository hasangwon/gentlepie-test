import { useState } from "react";
import useInquiryApi from "./useInquiryApi";
import { useRecoilState } from "recoil";
import { painAreaState } from "@/store/painAreaState";
import { formatPainArea } from "@/utils/formatText";
import { errorMessage, firstMessage } from "@/utils/constants";

const useInquiry = () => {
  const { sendMessageStream } = useInquiryApi();
  const [painArea, setPainArea] = useRecoilState(painAreaState);
  const [inputValue, setInputValue] = useState("");
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const [botMessage, setBotMessage] = useState(firstMessage);
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState("");

  const handleSendMessageStream = async (
    userMessage: string
  ): Promise<string | null> => {
    if (userMessage.trim() === "") return null;

    setInputValue("");
    setIsLoading(true);
    setUserMessages((prev) => [...prev, userMessage]);
    setBotMessage("");

    try {
      let finalText: string | null = null;

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
        },
        async (receivedFinalText) => {
          setIsLoading(false);
          finalText = receivedFinalText;
        }
      );

      return finalText;
    } catch (error) {
      console.error("Failed to fetch bot response:", error);
      setBotMessage(errorMessage);
      setIsLoading(false);
      return "";
    }
  };

  return {
    inputValue,
    setInputValue,
    userMessages,
    botMessage,
    isLoading,
    handleSendMessageStream,
    threadId,
    setThreadId,
    setUserMessages,
  };
};

export default useInquiry;
