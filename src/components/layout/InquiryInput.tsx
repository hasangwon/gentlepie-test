import SpeechToText from "@/components/common/Speech/SpeechToText";
import NextButton from "@/components/common/Svg/NextButton";
import React, { useRef, useEffect, useState } from "react";

const InquryInput = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleSendMessageStream,
  isLoading,
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (userMessage: string) => void;
  handleSendMessageStream: (userMessage: string) => void;
  isLoading: boolean;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSendMessageStream(inputValue);
    setInputValue("");
  };

  return (
    <div className="relative w-full px-4 py-2 text-base">
      <div className="relative w-full h-[5rem] bg-primary flex border border-primary rounded-[30px] mb-2 py-[14px]">
        <SpeechToText
          onResult={(transcript: any) => {
            setInputValue(transcript);
          }}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onEnd={() => {
            handleSendMessageStream(inputValue);
            setInputValue("");
          }}
        />
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder=""
          className="flex-grow px-6 text-white bg-transparent focus:outline-none placeholder:text-center placeholder:text-gentle-dark placeholder:text-2xl placeholder:pt-2 placeholder:pl-6 resize-none"
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (isLoading) return;
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit(event);
            }
          }}
        />
        <div className="flex mr-4 items-center">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex justify-center items-center mb-2"
          >
            <NextButton />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquryInput;