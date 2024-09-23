import React from "react";
import Header from "@/components/layout/Header/Header";
import ChatInput from "@/components/layout/ChatInput/ChatInput";
import useChat from "@/hooks/useChat/useChat";
import Head from "next/head";

const Index: React.FC = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    loading,
    handleSendMessage,
    handleTextButtonClick,
    regenerateMessage,
  } = useChat();

  return (
    <>
      <Head>
        <title>STT TEST</title>
      </Head>
      <div className="w-full h-full flex justify-center bg-gray-100">
        <div className="w-full h-full flex flex-col justify-between min-w-[320px] max-w-[720px] bg-white">
          <Header />
          <div className="border m-8 p-4 h-[30rem] bg-gray-100 rounded-xl">
            {inputValue}
          </div>
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={() => {
              handleSendMessage(inputValue);
            }}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
