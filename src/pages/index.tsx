import React from "react";
import Header from "../components/Header/Header";
import MessageBox from "../components/MessageBox/MessageBox";
import MessageInput from "../components/MessageInput/MessageInput";
import useChat from "@/hooks/useChat";

const Index: React.FC = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    loading,
    handleSendMessage,
    handleExampleQuestion,
    regenerateMessage,
  } = useChat();

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <MessageBox
        messages={messages}
        loading={loading}
        onButtonClick={handleExampleQuestion}
        regenerateMessage={regenerateMessage}
      />
      <MessageInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={() => handleSendMessage(inputValue)}
        loading={loading}
      />
    </div>
  );
};

export default Index;
