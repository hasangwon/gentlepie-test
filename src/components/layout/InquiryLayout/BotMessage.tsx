import TypingEffectMarkdown from "@/components/common/Typing/TypingEffectMarkdown";
import { getInquiryTypingSpeed } from "@/utils/getTypingSpeed";
import React from "react";

const BotMessage = ({
  message,
  scrollToBottom,
  audioRef,
}: {
  message: string;
  scrollToBottom: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}) => {
  return (
    <div className="px-[1.5rem] md:px-[7rem] lg:px-[10rem] overflow-y-auto min-h-[30rem] py-16 text-[24px] font-semibold text-center flex justify-center items-center text-bublitt-text leading-10">
      <TypingEffectMarkdown
        text={message}
        speed={getInquiryTypingSpeed(message.length)}
        scrollToBottom={scrollToBottom}
      />
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default BotMessage;
