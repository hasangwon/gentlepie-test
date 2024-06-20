import { MessageType } from "@/types/messageType";
import React from "react";

type ChatMessageProps = {
  message: MessageType;
  onButtonClick: (buttonText: string) => void;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onButtonClick,
}) => {
  return (
    <div
      className={`gap-4 items-start m-4 ${
        message.sender === "bot"
          ? "flex justify-start"
          : "flex flex-row-reverse"
      }`}
    >
      <div
        className={`w-4 h-4 mt-1 rounded-full ${
          message.sender === "bot" ? "bg-red-100 " : "bg-blue-100 "
        }`}
      />
      {(() => {
        switch (message.type) {
          case "text":
            return <div className="chat-message">{message.content}</div>;
          case "buttonList":
            return (
              <div className="">
                <div className="border p-2 rounded-md">
                  <div>{message.content}</div>
                  <div>
                    {message.url && (
                      <button
                        className="border p-2 bg-gray-100"
                        onClick={() => window.open(message.url?.link, "_blank")}
                      >
                        {message.url?.text}
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  {message.buttons.map((buttonText, index) => (
                    <button
                      className="border p-2"
                      key={index}
                      onClick={() => onButtonClick(buttonText)}
                    >
                      {buttonText}
                    </button>
                  ))}
                </div>
              </div>
            );
          case "menuList":
            return (
              <div className="chat-message">
                {message.content}
                <div className="flex">
                  {message.menu.map((menu, index) => (
                    <div key={index} className="border flex flex-col">
                      <h3 className="bg-gray-100 border-b font-semibold p-2">
                        {menu.title}
                      </h3>
                      {menu.buttons.map((buttonText, btnIndex) => (
                        <button
                          key={btnIndex}
                          className="p-2 border-b"
                          onClick={() => onButtonClick(buttonText)}
                        >
                          {buttonText}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default ChatMessage;
