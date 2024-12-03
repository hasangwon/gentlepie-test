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
    "문진을 시작하겠습니다.\n저에게 말씀하신 모든 내용이 진료에 중요하게 활용됩니다.\n통증 위치부터 구체적으로 말씀해주세요."
  );
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
      setBotMessage(
        "죄송합니다. 서버와의 통신에 문제가 발생했습니다.\n새로고침 후 다시 시도해주세요."
      );
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
