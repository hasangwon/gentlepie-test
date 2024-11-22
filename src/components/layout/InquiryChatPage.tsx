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
    <div className="bg-transparent h-[calc(100%-3.75rem)] w-full flex flex-col items-center justify-center z-10">
      <div className="h-full overflow-y-auto w-full">
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
      <InquryInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        handleSendMessageStream={handleSendMessageStream}
        isLoading={isLoading}
      />
    </div>
  );
};

export default InquiryChatPage;
