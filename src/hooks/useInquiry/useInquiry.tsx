import { useEffect, useRef, useState } from "react";
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
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSendMessage = async (userMessage: string) => {
    if (userMessage.trim() === "") return;

    try {
      const response = await createBotAnswer(userMessage);
      setBotMessage(response?.text);
      setThreadId(response?.threadId || "");
      // await fetchTTS(response?.text);
    } catch (error) {
      console.error("Failed to fetch bot response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createBotAnswer = async (userMessage: string) => {
    setUserMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage, threadId);
      return response;
    } catch (error) {
      console.error("createBotAnswer Error!", error);
    }
  };

  const fetchTTS = async (text: string) => {
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      if (response.ok) {
        const audioBase64 = data.audioContent;
        const audioBlob = new Blob(
          [Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0))],
          { type: "audio/mp3" }
        );
        const newAudioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(newAudioUrl);
      } else {
        console.error("오디오 생성 중 오류가 발생했습니다.", data);
      }
    } catch (err) {
      console.error("오디오 생성 중 오류가 발생했습니다.", err);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  }, [audioUrl]);

  return {
    inputValue,
    setInputValue,
    userMessages,
    botMessage,
    isLoading,
    handleSendMessage,
    fetchTTS,
    audioRef,
  };
};

export default useInquiry;
