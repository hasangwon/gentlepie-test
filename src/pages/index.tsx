import React from "react";
import Header from "../components/Header/Header";
import MessageBox from "../components/MessageBox/MessageBox";
import MessageInput from "../components/MessageInput/MessageInput";
import useChat from "@/hooks/useChat";

const IndexPage: React.FC = () => {
  const { messages, inputValue, setInputValue, loading, handleSendMessage } =
    useChat();

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <MessageBox messages={messages} loading={loading} />
      <MessageInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        loading={loading}
      />
    </div>
  );
};

export default IndexPage;
