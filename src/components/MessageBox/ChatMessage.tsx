import { MessageType } from "@/types/messageType";
import React from "react";

type ChatMessageProps = {
  message: MessageType;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  switch (message.type) {
    case "text":
      return <div className="chat-message">{message.content}</div>;
    case "buttonList":
      return (
        <div className="chat-message">
          {message.buttons.map((button, index) => (
            <button key={index} onClick={button.action}>
              {button.text}
            </button>
          ))}
        </div>
      );
    case "menuList":
      return (
        <div className="chat-message">
          {message.menu.map((menu, index) => (
            <div key={index}>
              <h3>{menu.title}</h3>
              {menu.buttons.map((button, btnIndex) => (
                <button key={btnIndex} onClick={button.action}>
                  {button.text}
                </button>
              ))}
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default ChatMessage;
