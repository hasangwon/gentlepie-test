import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { typingTextState } from "@/store/typingTextState";
import { linkifyAndAddLineBreaks } from "@/utils/addLineBreaks";

const TypingEffect = ({
  text,
  speed,
  scrollToBottom,
  startEvent,
  doneEvent,
}: {
  text: string;
  speed: number;
  scrollToBottom?: () => void;
  startEvent?: () => void;
  doneEvent?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const setTypingText = useSetRecoilState(typingTextState);

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    startEvent && startEvent();
    const interval = setInterval(() => {
      if (index < text.length) {
        if (index % 35 === 0) {
          scrollToBottom && scrollToBottom();
        }

        const nextChar = text[index];
        setDisplayedText((prev) => {
          const newText = prev + nextChar;
          setTypingText && setTimeout(() => setTypingText(newText), 0); // 상태 업데이트 지연

          return newText;
        });
        index += 1;
      } else {
        scrollToBottom && scrollToBottom();
        doneEvent && doneEvent();
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: linkifyAndAddLineBreaks(displayedText),
      }}
    />
  );
};

export default TypingEffect;
