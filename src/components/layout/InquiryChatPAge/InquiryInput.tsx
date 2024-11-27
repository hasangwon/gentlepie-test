import SpeechToText from "@/components/common/Speech/SpeechToText";
import NextButton from "@/components/common/Svg/NextButton";
import { sttState } from "@/store/sttState";
import React, { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import RefreshButton from "@/components/common/Svg/RefreshButton";
import Toggle from "@/components/common/atom/Toggle";
import MiniVoiceImage from "@/components/common/Svg/MiniVoiceImage";

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
  const [isSTTselected, setIsSTTselected] = useState(true);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    isSTTselected ? handleSendMessageStream(inputValue) : handleSendMessage(inputValue);
    setInputValue("");
  };

  const showToast = (isSTTselected: boolean) => {
    toast(isSTTselected ? "음성 입력 모드로 전환되었습니다." : "직접 입력 모드로 전환되었습니다.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      icon: false,
      style: {
        background: "rgba(95, 103, 227, 0.85)",
        color: "#fff",
        borderRadius: "20px",
        textAlign: "center",
        top: "3.5rem",
        minHeight: "42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "15px",
        padding: "4px 12px",
      },
    });
  };

  return (
    <div className="relative w-full h-full bg-primary flex flex-col rounded-t-[30px] md:rounded-none md:rounded-l-[30px]">
      <div className="relative w-full h-[3.5rem]">
        {isSTTselected && inputValue && !sttListening && (
          <button
            className="absolute left-6 top-6"
            onClick={() => {
              setInputValue("");
            }}
          >
            <RefreshButton />
          </button>
        )}
        <div className="absolute top-[26px] right-[9rem] text-[#ACACAC] text-base select-none">입력방식 변경</div>
        <Toggle
          on={isSTTselected}
          onToggle={() => {
            setInputValue("");
            setIsSTTselected(!isSTTselected);
            showToast(!isSTTselected);
          }}
          leftContent={"가"}
          rightContent={<MiniVoiceImage isActive={isSTTselected} />}
        />
      </div>
      {isSTTselected ? (
        <>
          <div className="w-full overflow-y-auto h-[55%] flex justify-center items-start font-semibold text-2xl text-white px-4">
            <div className="m-auto px-2 max-h-[10rem] overflow-y-auto">
              {inputValue || sttListening ? (
                inputValue
              ) : (
                <p className="text-xl text-[#ACACAC] leading-7 text-center select-none">
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
              isSTTselected ? handleSendMessageStream(inputValue) : handleSendMessage(inputValue);
              setInputValue("");
            }}
          />
        </>
      ) : (
        <div className="flex-grow flex justify-center items-center relative">
          <TextareaAutosize
            minRows={1}
            maxRows={5}
            className="text-xl pl-10 w-full text-center text-white bg-transparent focus:outline-none placeholder:text-center placeholder:text-gentle-dark resize-none"
            placeholder="여기를 눌러 내용을 입력해주세요."
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing) return;
              if (isLoading) return;
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
          />
          <div className="flex mr-4 items-start">
            <button onClick={handleSubmit} disabled={isLoading} className="flex justify-center items-center mb-0">
              <NextButton isActive={inputValue !== ""} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquryInput;
