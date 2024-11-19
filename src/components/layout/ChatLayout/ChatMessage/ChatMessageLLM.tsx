import React from "react";
import TypingEffect from "@/components/common/Typing/TypingEffect";
import { getTypingSpeed } from "@/utils/getTypingSpeed";
import MessageContainer from "../Container/MessageContainer";

const LLMMessage = ({
  message,
  scrollToBottom,
}: {
  message: any;
  scrollToBottom?: () => void;
}) => {
  if (message) {
    const resultMessage = message?.content;
    return (
      <MessageContainer>
        <TypingEffect
          scrollToBottom={scrollToBottom}
          text={message.content}
          speed={getTypingSpeed(resultMessage.length)}
        />
      </MessageContainer>
    );
  }
  return <div>{"error"}</div>;
};

export default LLMMessage;
