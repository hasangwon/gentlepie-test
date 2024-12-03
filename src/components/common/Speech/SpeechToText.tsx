import React, { useState, useEffect, useRef } from "react";
import useVisualize from "@/hooks/useVisualize";
import { useRecoilState } from "recoil";
import { sttState } from "@/store/sttState";
import VoiceImage from "../Svg/VoiceImage";
import RefreshButton from "../Svg/RefreshButton";

const SpeechToText = ({
  inputValue,
  setInputValue,
  onResult,
  handleSendMessageStream,
  fetchTTS,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
  onResult: (text: string) => void;
  handleSendMessageStream: (userMessage: string) => Promise<string | null>;
  fetchTTS: (text: string) => Promise<string>;
}) => {
  const [recognition, setRecognition] = useState<any>(null);
  const [sttListening, setSttListening] = useRecoilState(sttState);
  const mediaStreamRef = useRef<any>(null);
  const [isFirstRecord, setIsFirstRecord] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useVisualize(mediaStreamRef, sttListening, setSttListening);

  const printError = (error: string) => {
    switch (error) {
      case "no-speech":
        return console.log("음성이 감지되지 않았습니다. 다시 시도해주세요.");
        break;
      case "aborted":
        return console.log("음성 인식이 중단되었습니다.");
        break;
      case "network":
        return alert("인터넷 연결을 확인해주세요.");
        break;

      case "not-allowed":
        return alert("브라우저의 마이크 권한을 허용해주세요.");
        break;
      case "service-not-allowed":
        return alert("브라우저의 음성 인식 권한을 허용해주세요.");
        break;
      default:
        return alert(`음성 인식 중 알 수 없는 에러가 발생했습니다: ${error}`);
        break;
    }
  };

  useEffect(() => {
    if (!sttListening) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      let recognitionInstance: typeof SpeechRecognition | null = null;

      try {
        recognitionInstance = new SpeechRecognition();
        recognitionInstance.lang = "ko-KR";
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;

        recognitionInstance.onresult = (event: any) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = 0; i < event.results.length; i++) {
            const transcriptSegment = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcriptSegment;
            } else {
              interimTranscript += transcriptSegment;
            }
          }

          if (onResult && sttListeningRef.current) {
            onResult(interimTranscript);
          }

          if (finalTranscript && sttListeningRef.current) {
            onResult(finalTranscript);
          }
        };

        recognitionInstance.onerror = (event: any) => {
          printError(event.error);
          recognitionInstance.stop();
          setSttListening(false);
          setRecognition(null);

          if (event.error === "no-speech") {
            setTimeout(() => {
              setSttListening(true);
            }, 500);
          }
        };

        recognitionInstance.start();
        setRecognition(recognitionInstance);
      } catch (error) {
        console.error("Failed to initialize SpeechRecognition:", error);
        alert("음성 인식 초기화에 실패했습니다. 브라우저를 확인해주세요.");
        setSttListening(false); // STT 상태 비활성화
      }

      return () => {
        recognitionInstance?.stop();
        setRecognition(null);
      };
    } else {
      alert("Your browser does not support Web Speech API.");
      window.location.reload();
      setSttListening(false);
    }
  }, [sttListening]);

  // 타이머 자동 전송 effect
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (inputValue && sttListening) {
      timeoutRef.current = setTimeout(() => {
        stopRecognition();
        // onEnd();
      }, 3500);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inputValue]);

  const startRecognition = () => {
    setSttListening(true);
    setInputValue("");
    setIsFirstRecord(false);
  };

  const stopRecognition = async (): Promise<void> => {
    setSttListening(false);
    return new Promise((resolve) => {
      if (recognition) {
        recognition.stop();
        setRecognition(null);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (mediaStreamRef.current) {
        const audioTracks = mediaStreamRef.current
          .getTracks()
          .filter(
            (track: any) =>
              track.kind === "audio" && track.readyState === "live"
          );
        if (audioTracks.length > 0) {
          audioTracks.forEach((track: any) => track.stop());
          console.log("Media stream stopped.");
          mediaStreamRef.current = null;
        }
      }
      resolve();
    });
  };

  const sttListeningRef = useRef(sttListening);
  useEffect(() => {
    sttListeningRef.current = sttListening;
  }, [sttListening]);

  return (
    <div className={`flex flex-1 justify-center items-start w-full mt-1 mb-4`}>
      {inputValue && !sttListening && (
        <button
          className="flex items-center gap-3 absolute left-6 top-[26px] tracking-tight"
          onClick={() => {
            startRecognition();
            // setInputValue("");
          }}
        >
          <RefreshButton />
          <div className="text-[#ACACAC] text-base select-none">
            답변 다시하기
          </div>
        </button>
      )}
      {sttListening ? (
        <button
          type="button"
          className="w-[68px] h-[68px] linear-gradient-voice-in rounded-full border-white border-2"
          onClick={async () => {
            setIsFirstRecord(true);
            stopRecognition().then(async () => {
              const finalText = await handleSendMessageStream(inputValue);
              if (finalText) await fetchTTS(finalText);
            });
          }}
          disabled={!sttListening}
        >
          <canvas id="visualizer" className="w-full h-full"></canvas>
        </button>
      ) : (isFirstRecord && !sttListening) || inputValue === "" ? (
        <button
          type="button"
          className="linear-gradient-voice rounded-full border-white border-2 p-3"
          onClick={startRecognition}
          disabled={sttListening}
        >
          <VoiceImage />
        </button>
      ) : (
        <button
          type="button"
          className="linear-gradient-voice rounded-full border-white border-2 w-[68px] h-[68px] flex justify-center items-center"
          onClick={(e) => {
            setIsFirstRecord(true);
            stopRecognition().then(async () => {
              const finalText = await handleSendMessageStream(inputValue);
              if (finalText) await fetchTTS(finalText);
            });
          }}
          disabled={sttListening}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="35"
            viewBox="0 0 36 35"
            fill="none"
          >
            <path
              d="M17.7836 3L32.5666 17.7842L17.7836 32.5672"
              stroke="white"
              strokeWidth="4.77"
              strokeLinecap="round"
            />
            <path
              d="M3.00052 17.7832H32.5666"
              stroke="white"
              strokeWidth="4.77"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SpeechToText;
