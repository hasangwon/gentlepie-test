import { messagesState } from "@/store/messageState";
import { sessionState } from "@/store/sessionState";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";


const useChatState = () => {
  const session = useRecoilValue(sessionState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  return {
    session,
    messages,
    setMessages,
    loading,
    setLoading,
    inputValue,
    setInputValue
  };
};

export default useChatState;
