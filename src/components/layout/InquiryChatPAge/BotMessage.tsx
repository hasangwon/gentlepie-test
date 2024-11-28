import React, { useEffect } from "react";
import { getInquiryTypingSpeed } from "@/utils/getTypingSpeed";
import TypingEffectStream from "../../common/Typing/TypingEffectStream";
import TypingEffectMarkdown from "../../common/Typing/TypingEffectMarkdown";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { sttState } from "@/store/sttState";

const BotMessage = ({ message, scrollToBottom, audioRef, messagesEndRef }: { message: string; scrollToBottom: () => void; audioRef: React.RefObject<HTMLAudioElement>; messagesEndRef: React.RefObject<HTMLDivElement> }) => {
  const doctorName = "김정훈 대표원장";
  const [sttListening, setSttListening] = useRecoilState(sttState);

  useEffect(() => {
    const audioElement = audioRef?.current;
    if (!audioElement) return;
    if (sttListening) {
      audioElement.pause();
    }
    return () => {
      audioElement.pause();
    };
  }, [sttListening, audioRef]);

  return (
    <div className="flex w-full h-full overflow-y-auto">
      <div className="m-auto px-[2rem] md:px-[2.5rem] lg:px-[3rem] pb-8 text-[24px] font-semibold text-center flex flex-col justify-start items-center text-bublitt-text leading-10">
        <div className="w-full flex flex-col justify-center items-center pt-6 pb-6">
          <Image src="/bot profile.png" width={57} height={57} alt="doctor" />
          <h3 className="text-xs text-gentle-dark mt-1">{doctorName}</h3>
        </div>
        <TypingEffectStream className="mb-[1rem] md:mb-[4rem]" textStream={message.replace(/(?<!\d)([.?])/g, "$1\n").replace(/(?<!^)-/g, "\n-")} typingSpeed={getInquiryTypingSpeed(message.length)} scrollToBottom={scrollToBottom} />
        <audio ref={audioRef} style={{ display: "none" }} />
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default BotMessage;
