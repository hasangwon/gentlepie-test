import React from "react";
import { getInquiryTypingSpeed } from "@/utils/getTypingSpeed";
import Image from "next/image";
import { BASE_PATH, doctorName } from "@/utils/constants";
import TypingEffectStream from "@/components/common/Interaction/TypingEffectStream";

const BotMessage = ({
  message,
  scrollToBottom,
  messagesEndRef,
}: {
  message: string;
  scrollToBottom: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div className="flex w-full h-full overflow-y-auto">
      <div className="m-auto px-[2rem] md:px-[2.5rem] lg:px-[3rem] pb-8 text-[24px] font-semibold text-center flex flex-col justify-start items-center text-bublitt-text leading-10">
        <div className="relaitve w-full flex flex-col justify-center items-center pt-6 pb-6 min-w-[5rem]">
          <div className="min-w-[3rem]">
            <Image
              src={`${BASE_PATH}/bot_profile.png`}
              width={57}
              height={57}
              alt="doctor"
            />
          </div>
          <h3 className="text-xs text-gentle-dark mt-1">{doctorName}</h3>
        </div>
        <TypingEffectStream
          className="mb-[1rem] md:mb-[4rem]"
          textStream={message
            .replace(/([.?])/g, (match, p1, offset, str) => {
              if (offset === 0 || !/\d/.test(str[offset - 1])) {
                return `${p1}\n`;
              }
              return p1;
            })
            .replace(/-/g, (match, offset) => {
              if (offset === 0) {
                return match;
              }
              return `\n${match}`;
            })}
          typingSpeed={getInquiryTypingSpeed(message.length)}
          scrollToBottom={scrollToBottom}
        />
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default BotMessage;
