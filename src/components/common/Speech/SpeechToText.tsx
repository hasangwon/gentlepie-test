import React, { useState, useEffect, useRef } from "react";
import useVisualize from "@/hooks/useVisualize";
import { useRecoilState } from "recoil";
import { sttState } from "@/store/sttState";
import VoiceImage from "../Svg/VoiceImage";

const SpeechToText = ({
  inputValue,
  setInputValue,
  onResult,
  onEnd,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
  onResult: (text: string) => void;
  onEnd?: any;
}) => {
  const [recognition, setRecognition] = useState<any>(null);
  const [sttListening, setSttListening] = useRecoilState(sttState);
  const mediaStreamRef = useRef<any>(null);
  const [isFirstRecord, setIsFirstRecord] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useVisualize(mediaStreamRef, sttListening, setSttListening);

  useEffect(() => {
    if (!sttListening) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
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

        if (onResult) {
          onResult(interimTranscript);
        }

        if (finalTranscript) {
          onResult(finalTranscript);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error detected: " + event.error);
        if (event.error === "no-speech") {
          console.log("No speech detected, restarting recognition...");
          recognitionInstance.stop();
          setTimeout(() => {
            recognitionInstance.start();
          }, 500);
        } else if (event.error === "network") {
          alert("인터넷 연결을 확인해주세요.");
          recognitionInstance.stop();
        }
      };

      recognitionInstance.start();
      setRecognition(recognitionInstance);

      return () => {
        recognitionInstance.stop();
        setRecognition(null);
      };
    } else {
      alert("Your browser does not support Web Speech API.");
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

  const stopRecognition = () => {
    setSttListening(false);

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
          (track: any) => track.kind === "audio" && track.readyState === "live"
        );
      if (audioTracks.length > 0) {
        audioTracks.forEach((track: any) => track.stop());
        console.log("Media stream stopped.");
        mediaStreamRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else {
      setSttListening(false);
    }
  };

  console.log("isListening: ", sttListening);

  return (
    <div className={`flex flex-1 justify-center items-start w-full mt-1`}>
      {sttListening ? (
        <button
          type="button"
          className="w-[68px] h-[68px] linear-gradient-voice-in rounded-full border-white border-2"
          onClick={stopRecognition}
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
          onClick={() => {
            onEnd();
            setIsFirstRecord(true);
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
              stroke-width="4.77"
              stroke-linecap="round"
            />
            <path
              d="M3.00052 17.7832H32.5666"
              stroke="white"
              stroke-width="4.77"
              stroke-linecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SpeechToText;
