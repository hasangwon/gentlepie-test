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
      <div className="px-[1.5rem] md:px-[2rem] lg:px-[3rem] h-full py-8 text-[24px] font-semibold text-center flex flex-col justify-start items-center text-bublitt-text leading-10">
        <TypingEffectStream
          textStream={message.replace(/ /g, "\n")}
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
