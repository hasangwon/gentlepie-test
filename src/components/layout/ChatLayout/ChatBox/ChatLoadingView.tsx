import React from "react";
import MessageContainer from "../Container/MessageContainer";

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
