import React, { useEffect, useState } from "react";
import BotMessage from "./BotMessage";
import ArrowButton from "../../common/Svg/ArrowButton";
import InquryInput from "./InquiryInput";
import LoadingAnimation from "@/components/common/atom/LoadingAnimation";
import { useRecoilState } from "recoil";
import { sttState } from "@/store/sttState";

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
  isTTSloading,
  fetchTTS,
}: {
  isLoading: boolean;
  botMessage: string;
  scrollToBottom: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessageStream: (userMessage: string) => Promise<string | null>;
  handleEndModal: (isOpen: boolean) => void;
  userMessages: string[];
  isTTSloading: boolean;
  fetchTTS: (text: string) => Promise<string>;
}) => {
  const [sttListening, setSttListening] = useRecoilState(sttState);

  useEffect(() => {
    const audioElement = audioRef?.current;
    if (!audioElement) return;
    if (sttListening || isLoading) {
      audioElement.pause();
    }
    return () => {
      audioElement.pause();
    };
  }, [sttListening, isLoading, audioRef]);

  // const [audioSize, setAudioSize] = useState({ width: 0, height: 0 });
  // const updateAudioSize = () => {
  //   if (audioRef.current) {
  //     const rect = audioRef.current.getBoundingClientRect();
  //     setAudioSize({ width: rect.width, height: rect.height });
  //   }
  // };

  // useEffect(() => {
  //   updateAudioSize();
  //   window.addEventListener("resize", updateAudioSize);
  //   return () => {
  //     window.removeEventListener("resize", updateAudioSize);
  //   };
  // }, []);

  return (
    <>
      <div className="relative flex justify-center items-center">
        <audio ref={audioRef} controls />
        {isTTSloading && (
          <div
            className="absolute bg-gray-800 bg-opacity-50 flex items-center justify-center rounded-xl"
            // style={{
            //   width: `${audioSize.width}px`,
            //   height: `${audioSize.height}px`,
            // }}
          >
            <div className="loader border-t-transparent border-4 border-blue-500 w-6 h-6 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

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
            fetchTTS={fetchTTS}
            handleSendMessageStream={handleSendMessageStream}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default InquiryChatPage;
