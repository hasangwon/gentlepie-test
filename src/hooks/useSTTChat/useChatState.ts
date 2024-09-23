import { useState } from "react";


const useChatState = () => {
  const [inputValue, setInputValue] = useState<string>("");

  return {
    inputValue,
    setInputValue
  };
};

export default useChatState;
