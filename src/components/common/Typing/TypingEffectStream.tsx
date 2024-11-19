import React, { useState, useEffect } from "react";

interface TypingEffectStreamProps {
  textStream: string;
  typingSpeed?: number;
  scrollToBottom?: () => void | null;
}

const TypingEffectStream: React.FC<TypingEffectStreamProps> = ({
  textStream,
  typingSpeed = 30,
  scrollToBottom = null,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [typedIndex, setTypedIndex] = useState(0);
  useEffect(() => {
    let index = textStream.length;
    if (index % 10 === 0) {
      scrollToBottom && scrollToBottom();
    }
    if (typedIndex < textStream.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + textStream[typedIndex]);
        setTypedIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [typedIndex, textStream, typingSpeed]);

  useEffect(() => {
    if (typedIndex < textStream.length) {
      setTypedIndex(displayText.length);
    }
  }, [textStream]);

  return <div>{displayText}</div>;
};

export default TypingEffectStream;
