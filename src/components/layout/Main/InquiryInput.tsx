import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { sttState } from "@/store/sttState";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import Toggle from "@/components/common/atom/Toggle";
import NextButton from "@/components/common/Svg/NextButton";
import MiniVoiceImage from "@/components/common/Svg/MiniVoiceImage";
import SpeechToText from "@/components/common/Interaction/SpeechToText";

const InquryInput = ({
  inputValue,
  setInputValue,
  handleSendMessageStream,
  isLoading,
  fetchTTS,
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessageStream: (userMessage: string) => Promise<string | null>;
  isLoading: boolean;
  fetchTTS: (text: string) => Promise<string>;
}) => {
  const [sttListening, setSttListening] = useRecoilState(sttState);
  const [isSTTselected, setIsSTTselected] = useState(true);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const finalText = await handleSendMessageStream(inputValue);
    if (finalText) fetchTTS(finalText);
  };

  const showToast = (isSTTselected: boolean) => {
    toast(
      isSTTselected
        ? "음성 입력 모드로 전환되었습니다."
        : "직접 입력 모드로 전환되었습니다.",
      {
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
      }
    );
  };

  return (
    <div className="border-[#5F67E3] border-t-2 md:border-l-2 relative w-full h-full bg-primary flex flex-col rounded-t-[30px] md:rounded-none md:rounded-l-[30px]">
      <div className="relative w-full h-[3.5rem]">
        <div className="absolute top-[26px] right-[7rem] text-[#ACACAC] text-base select-none">
          입력방식 변경
        </div>
        <Toggle
          on={isSTTselected}
          onToggle={() => {
            setInputValue("");
            setIsSTTselected(!isSTTselected);
            setSttListening(false);
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
            handleSendMessageStream={handleSendMessageStream}
            fetchTTS={fetchTTS}
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
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex justify-center items-center mb-0"
            >
              <NextButton isActive={inputValue !== ""} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquryInput;
