import SpeechToText from "@/components/common/Speech/SpeechToText";
import NextButton from "@/components/common/Svg/NextButton";
import { sttState } from "@/store/sttState";
import React, { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Toggle from "../common/atom/Toggle";

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
  const [sttListening, setSttListening] = useRecoilState(sttState);
  const [isSttActive, setIsSttActive] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSendMessageStream(inputValue);
    setInputValue("");
  };

  return (
    <div className="relative w-full h-full bg-primary flex flex-col rounded-t-[30px] md:rounded-none md:rounded-l-[30px]">
      <div className="relative w-full h-[3.5rem]">
        <div className="absolute top-[26px] right-[9rem] text-[#ACACAC] text-base select-none">
          입력방식 변경
        </div>
        <Toggle
          on={isSttActive}
          onToggle={() => {
            setIsSttActive(!isSttActive);
          }}
          leftContent={"가"}
          rightContent={"나"}
        />
      </div>
      <div className="w-full overflow-y-auto h-[55%] flex justify-center items-start font-semibold text-2xl text-white px-4">
        <div className="m-auto">
          {inputValue || sttListening ? (
            inputValue
          ) : (
            <p className="text-base text-[#ACACAC] leading-7 text-center">
              아래의 버튼을 눌러
              <br />
              말씀을 시작해 주세요.
            </p>
          )}
        </div>
      </div>
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
      {/* <textarea
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
      /> */}
      {/* <div className="flex mr-4 items-center">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex justify-center items-center mb-2"
        >
          <NextButton />
        </button>
      </div> */}
    </div>
  );
};

export default InquryInput;
