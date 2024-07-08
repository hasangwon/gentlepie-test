import React, { useState, useEffect } from "react";

const TypingEffect = ({
  text,
  speed,
  scrollToBottom,
}: {
  text: string;
  speed: number;
  scrollToBottom?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (index < text.length) {
        const nextChar = text[index];
        setDisplayedText((prev) => {
          const newText = prev + nextChar;
          return newText;
        });
        index += 1;
      } else {
        scrollToBottom && scrollToBottom();
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <div>{displayedText}</div>;
};

export default TypingEffect;
