import useChatState from './useChatState';

const useChat = () => {
  const { inputValue,
    setInputValue,
  } = useChatState();

  return {
    inputValue,
    setInputValue,
  };
};

export default useChat;
