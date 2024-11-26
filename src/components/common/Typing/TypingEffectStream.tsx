import React, { useState, useEffect } from "react";
import showdown from "showdown";

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

  const converter = new showdown.Converter({
    tables: true,
    openLinksInNewWindow: true,
    simpleLineBreaks: true,
    simplifiedAutoLink: true,
  });

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

  // Markdown을 HTML로 변환
  const htmlContent = converter.makeHtml(displayText);

  return (
    <div
      className="markdown-table m-auto"
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
    // <div className="m-auto">{displayText}</div>
  );
};

export default TypingEffectStream;
