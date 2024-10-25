import TypingEffect from "@/components/common/Typing/TypingEffect";
import { getInquiryTypingSpeed } from "@/utils/getTypingSpeed";
import React from "react";

const BotMessage = ({
  message,
  scrollToBottom,
}: {
  message: string;
  scrollToBottom: () => void;
}) => {
  return (
    <div className="px-[4rem] md:px-[7rem] lg:px-[10rem] overflow-y-auto min-h-[30rem] py-16 text-[24px] font-semibold text-center flex justify-center items-center text-bublitt-text leading-10">
      <TypingEffect
        text={message}
        speed={getInquiryTypingSpeed(message.length)}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
};

export default BotMessage;
