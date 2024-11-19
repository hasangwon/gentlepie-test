import React from "react";
import Head from "next/head";
import ChatInput from "@/components/layout/ChatLayout/ChatInput";
import ChatBox from "@/components/layout/ChatLayout/ChatBox";
import useChat from "@/hooks/chat/useChat/useChat";

const Chat: React.FC = () => {
  const { messages, inputValue, setInputValue, loading, handleSendMessage } =
    useChat();

  return (
    <>
      <Head>
        <title>CHAT-TEST</title>
      </Head>
      <div className="w-full h-full flex justify-center bg-gray-100 overflow-hidden">
        <div className="w-full h-full flex flex-col justify-between min-w-[320px] max-w-[720px] bg-white">
          <div className="border m-8 p-4 h-full bg-gray-100 rounded-xl overflow-auto">
            <ChatBox messages={messages} loading={loading} />
          </div>
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={() => handleSendMessage(inputValue)}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
