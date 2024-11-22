import React from "react";
import { getInquiryTypingSpeed } from "@/utils/getTypingSpeed";
import TypingEffectStream from "../common/Typing/TypingEffectStream";

const BotMessage = ({
  message,
  scrollToBottom,
  audioRef,
  messagesEndRef,
}: {
  message: string;
  scrollToBottom: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <>
      <div className="px-[1.5rem] md:px-[7rem] lg:px-[10rem] overflow-y-auto min-h-[30rem] py-16 text-[24px] font-semibold text-center flex justify-center items-center text-bublitt-text leading-10">
        <TypingEffectStream
          textStream={message}
          typingSpeed={50}
          scrollToBottom={scrollToBottom}
        />
        <audio ref={audioRef} style={{ display: "none" }} />
      </div>
      <div ref={messagesEndRef} />
    </>
  );
};

export default BotMessage;
