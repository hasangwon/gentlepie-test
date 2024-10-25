import MessageContainer from "@/components/common/Container/MessageContainer";
import TypingEffect from "@/components/common/Typing/TypingEffect";
import { getTypingSpeed } from "@/utils/getTypingSpeed";
import React from "react";

const BotMessage = ({
  message,
  scrollToBottom,
}: {
  message: string;
  scrollToBottom: () => void;
}) => {
  return (
    <div className="overflow-y-auto min-h-[30rem] py-16 px-[10rem] text-[24px] font-semibold text-center flex justify-center items-center text-bublitt-text leading-10">
      <TypingEffect
        text={message}
        speed={getTypingSpeed(message.length)}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
};

export default BotMessage;
