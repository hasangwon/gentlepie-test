import React from "react";

import Header from "@/components/layout/Header/Header";
import ChatBox from "@/components/layout/ChatBox/ChatBox";
import ChatInput from "@/components/layout/ChatInput/ChatInput";
import useChat from "@/hooks/useChat/useChat";
import Carousel from "@/components/common/Carousel/Carousel";
import useMenu from "@/hooks/useMenu/useMenu";
import { MessageType } from "@/types/messageType";

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

  const { menu, setMenu } = useMenu();

  const renderContent = () => {
    switch (menu) {
      case "FAQ":
        return (
          <Carousel
            handleTextButtonClick={handleTextButtonClick}
            setMenu={setMenu}
          />
        );
      case "Chat":
        return (
          <ChatBox
            messages={messages}
            loading={loading}
            onButtonClick={handleTextButtonClick}
            regenerateMessage={regenerateMessage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      {renderContent()}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={() => handleSendMessage(inputValue)}
        loading={loading}
      />
    </div>
  );
};

export default Index;
