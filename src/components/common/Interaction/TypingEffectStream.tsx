import React, { useState, useEffect } from "react";
import showdown from "showdown";

interface TypingEffectStreamProps {
  textStream: string;
  typingSpeed?: number;
  scrollToBottom?: () => void | null;
  className?: string;
}

const TypingEffectStream: React.FC<TypingEffectStreamProps> = ({
  textStream,
  typingSpeed = 30,
  scrollToBottom = null,
  className,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [typedIndex, setTypedIndex] = useState(0);

  const converter = new showdown.Converter({
    tables: true,
    openLinksInNewWindow: true,
    simpleLineBreaks: true,
    simplifiedAutoLink: true,
  });

  useEffect(() => {
    if (typedIndex % 10 === 0) {
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

  const htmlContent = converter.makeHtml(displayText);

  return (
    <div
      className={`${className}`}
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
  );
};

export default TypingEffectStream;
