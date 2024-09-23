import SpeechToText from "@/components/common/Speech/SpeechToText";
import React, { useRef, useEffect, useState } from "react";

type ChatInputProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
};

const STTInput: React.FC<ChatInputProps> = ({ inputValue, setInputValue }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const [isListening, setIsListening] = useState(false);

  return (
    <div className="relative w-full px-4 py-2 text-base">
      <form
        onSubmit={() => setInputValue("")}
        className="relative w-full h-[5rem] bg-white flex border border-primary rounded-[50px] mb-2 py-4"
      >
        <SpeechToText
          isListening={isListening}
          setIsListening={setIsListening}
          onResult={(transcript: any) => {
            console.log(transcript);
            setInputValue(transcript);
          }}
        />
        {!isListening && (
          <>
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="궁금하면 무엇이든 검색하세요"
              className="flex-grow px-4 text-primary bg-transparent focus:outline-none placeholder:text-center placeholder:text-primary pr-20"
            />
            <button
              type="submit"
              className="text-xs w-12 h-10 bg-primary text-white p-2 rounded-full absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {"초기화"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default STTInput;
