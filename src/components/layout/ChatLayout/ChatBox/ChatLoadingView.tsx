import MessageContainer from "@/components/common/Container/MessageContainer";
import React from "react";

const ChatLoadingView = () => {
  return (
    <MessageContainer>
      <div className="w-full h-full">
        <div className="loader" />
      </div>
    </MessageContainer>
  );
};

export default ChatLoadingView;
