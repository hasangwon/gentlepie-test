// import TypingEffect from "@/components/common/Typing/TypingEffect";
import TypingEffectMarkdown from "@/components/common/Typing/TypingEffectMarkdown";
import { getInquiryTypingSpeed } from "@/utils/getTypingSpeed";
import React from "react";
import { sttState } from "@/store/sttState";
import { useRecoilState } from "recoil";

const BotMessage = ({ message, scrollToBottom }: { message: string; scrollToBottom: () => void }) => {
  const [sttListening, setSttListening] = useRecoilState(sttState);

  return (
    <div className="px-[1.5rem] md:px-[7rem] lg:px-[10rem] overflow-y-auto min-h-[30rem] py-16 text-[24px] font-semibold text-center flex justify-center items-center text-bublitt-text leading-10">
      {/* <TypingEffect */}
      <TypingEffectMarkdown
        text={message}
        speed={getInquiryTypingSpeed(message.length)}
        scrollToBottom={scrollToBottom}
        doneEvent={() => {
          setSttListening(true);
        }}
      />
    </div>
  );
};

export default BotMessage;
