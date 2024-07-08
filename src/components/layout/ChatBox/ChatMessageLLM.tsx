import TextToSpeech from "@/components/common/Speech/TextToSpeech";
import TypingEffect from "@/components/common/TypingEffect/TypingEffect";
import { MessageType } from "@/types/messageType";
import { getTypingSpeed } from "@/utils/getTypingSpeed";
import React from "react";

const LLMMessage = ({
  message,
  scrollToBottom,
}: {
  message: MessageType;
  scrollToBottom?: () => void;
}) => {
  if (message.sender) {
    const resultMessage = message?.content;
    return (
      <div className="flex mt-6">
        <div className="flex">
          <div className="border-primary border-[1.5px] text-primary rounded-full w-6 h-6 flex justify-center items-center mr-2">
            C
          </div>

          <div className="bg-neutral-light bg-neutral-100 rounded-xl p-4">
            <TypingEffect
              scrollToBottom={scrollToBottom}
              text={resultMessage}
              speed={getTypingSpeed(resultMessage.length)}
            />
            <div className="flex w-full justify-end mt-2">👍 👎</div>
            <TextToSpeech
              text={resultMessage}
              speakLabel="읽기"
              stopLabel="정지"
            />
          </div>
        </div>
      </div>
    );
  }
  return <div>{"error"}</div>;
};

export default LLMMessage;
