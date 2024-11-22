import React from "react";
import BotMessage from "./BotMessage";
import InquryInput from "./InquiryInput";
import InquiryLoader from "./InquiryLoader";

const InquiryChatPage = ({
  isLoading,
  botMessage,
  scrollToBottom,
  audioRef,
  messagesEndRef,
  inputValue,
  setInputValue,
  handleSendMessage,
  handleSendMessageStream,
}: {
  isLoading: boolean;
  botMessage: string;
  scrollToBottom: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (userMessage: string) => Promise<void>;
  handleSendMessageStream: (userMessage: string) => Promise<void>;
}) => {
  return (
    <>
      <div className="responsive_device_container bg-transparent w-full h-full z-10 pt-[4rem]">
        <div className="responsive_device shrink-0 overflow-y-auto">
          {isLoading ? (
            <InquiryLoader />
          ) : (
            <BotMessage
              message={botMessage}
              scrollToBottom={scrollToBottom}
              audioRef={audioRef}
              messagesEndRef={messagesEndRef}
            />
          )}
        </div>
        <div className="responsive_device_input flex items-start grow min-h-0 overflow-y-auto relative text-base">
          <InquryInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            handleSendMessageStream={handleSendMessageStream}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default InquiryChatPage;
