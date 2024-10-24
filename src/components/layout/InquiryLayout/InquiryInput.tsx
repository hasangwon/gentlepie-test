import SpeechToText from "@/components/common/Speech/SpeechToText";
import NextButton from "@/components/common/Svg/NextButton";
import React, { useRef, useEffect, useState } from "react";

const InquryInput = ({
  inputValue,
  setInputValue,
  handleSendMessage,
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (userMessage: string) => void;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="relative w-full px-4 py-2 text-base">
      <div className="relative w-full h-[5rem] bg-primary flex border border-primary rounded-[30px] mb-2 py-[14px]">
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder=""
          className="flex-grow px-6 text-white bg-transparent focus:outline-none placeholder:text-center placeholder:text-white resize-none"
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit(event);
            }
          }}
        />
        <div className="flex mr-4 items-end">
          <button
            onClick={handleSubmit}
            className="flex justify-center items-center mr-1"
          >
            <NextButton />
          </button>
          <SpeechToText
            onResult={(transcript: any) => {
              console.log("바로 동작", transcript);
              console.log("적용", transcript);

              setInputValue(transcript);
            }}
            // inputValue={inputValue}
            // setInputValue={setInputValue}
          />
        </div>
      </div>
    </div>
  );
};

export default InquryInput;
