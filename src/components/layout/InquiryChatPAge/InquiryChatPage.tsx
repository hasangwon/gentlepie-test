import React from "react";
import BotMessage from "./BotMessage";
import ArrowButton from "../../common/Svg/ArrowButton";
import InquryInput from "./InquiryInput";
import LoadingAnimation from "@/components/common/atom/LoadingAnimation";

const InquiryChatPage = ({
  isLoading,
  botMessage,
  scrollToBottom,
  audioRef,
  messagesEndRef,
  inputValue,
  setInputValue,
  handleSendMessageStream,
  handleEndModal,
  userMessages,
}: {
  isLoading: boolean;
  botMessage: string;
  scrollToBottom: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessageStream: (userMessage: string) => Promise<void>;
  handleEndModal: (isOpen: boolean) => void;
  userMessages: string[];
}) => {
  return (
    <>
      <div className="responsive_device_container bg-transparent w-full h-full z-10 pt-[3.25rem]">
        <div className="responsive_device_chat shrink-0 relative">
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <>
              <BotMessage
                message={botMessage}
                scrollToBottom={scrollToBottom}
                audioRef={audioRef}
                messagesEndRef={messagesEndRef}
              />
            </>
          )}
          {userMessages.length > 12 && (
            <button
              onClick={() => handleEndModal(true)}
              className="absolute flex items-center bg-[#A9FF95] opacity-80 py-4 px-6 bottom-4 right-2 shadow-lg rounded-[16px] text-primary font-bold gap-2"
            >
              문진 완료하기 <ArrowButton />
            </button>
          )}
        </div>
        <div className="responsive_device_input flex items-start grow min-h-0 overflow-y-auto relative text-base">
          <InquryInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessageStream={handleSendMessageStream}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default InquiryChatPage;
