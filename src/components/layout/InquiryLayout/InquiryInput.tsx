import SpeechToText from "@/components/common/Speech/SpeechToText";
import NextButton from "@/components/common/Svg/NextButton";
import React, { useRef, useEffect, useState } from "react";

const InquryInput = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  isListening,
  setIsListening,
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (userMessage: string) => void;
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
      <form
        onSubmit={handleSubmit}
        className="relative w-full h-[4.5rem] bg-primary flex border border-primary rounded-[30px] mb-2 py-4"
      >
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder=""
          className="flex-grow px-6 text-white bg-transparent focus:outline-none placeholder:text-center placeholder:text-white resize-none"
        />
        <div className="flex mr-4 items-end">
          <button
            onClick={handleSubmit}
            className="flex justify-center items-center mr-2"
          >
            <NextButton />
          </button>
          <SpeechToText
            isListening={isListening}
            setIsListening={setIsListening}
            onResult={(transcript: any) => {
              console.log(transcript);
              setInputValue(transcript);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default InquryInput;
