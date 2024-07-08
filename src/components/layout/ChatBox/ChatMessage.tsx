import { MessageType } from "@/types/messageType";
import React from "react";

type ChatMessageProps = {
  message: MessageType;
  onButtonClick: (buttonText: string) => void;
  regenerateMessage: (message: MessageType) => void;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onButtonClick,
  regenerateMessage,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    alert("Message copied to clipboard");
  };

  return (
    <div
      className={`relative gap-4 items-start m-4 ${
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
      <div className="relative group p-4 rounded-xl bg-neutral-100">
        {(() => {
          switch (message.type) {
            case "text":
              return <div className="chat-message">{message.content}</div>;
            case "buttonList":
              return (
                <div className="">
                  <div className="p-2 rounded-md">
                    <div>{message.content}</div>
                    <div>
                      {message.url && (
                        <button
                          className="p-2 bg-white rounded-xl mr-1"
                          onClick={() =>
                            window.open(message.url?.link, "_blank")
                          }
                        >
                          {message.url?.text}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    {message?.buttons?.map((buttonText, index) => (
                      <button
                        className="p-2 bg-white rounded-xl mr-1"
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
            case "loading":
              return (
                <div className="chat-message">챗봇이 타이핑 중입니다...</div>
              );
            default:
              return null;
          }
        })()}
        {message.sender === "bot" && (
          <>
            <button
              onClick={handleCopy}
              className="absolute top-0 right-[-3rem] bg-gray-200 p-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Copy
            </button>
            {message.question && (
              <button
                className="p-2 bg-white rounded-xl mt-1"
                onClick={() => regenerateMessage(message)}
              >
                재생성
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
