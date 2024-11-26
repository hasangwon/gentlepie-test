import React from "react";
import { getInquiryTypingSpeed } from "@/utils/getTypingSpeed";
import TypingEffectStream from "../../common/Typing/TypingEffectStream";
import TypingEffectMarkdown from "../../common/Typing/TypingEffectMarkdown";

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
      <div className="px-[2rem] md:px-[2.5rem] lg:px-[3rem] h-full py-8 text-[24px] font-semibold text-center flex flex-col justify-start items-center text-bublitt-text leading-10">
        <TypingEffectStream
          textStream={message
            .replace(/(?<!\d)([.?])/g, "$1\n")
            .replace(/(?<!^)-/g, "\n-")}
          typingSpeed={getInquiryTypingSpeed(message.length)}
          scrollToBottom={scrollToBottom}
        />
        <audio ref={audioRef} style={{ display: "none" }} />
      </div>
      <div ref={messagesEndRef} />
    </>
  );
};

export default BotMessage;
