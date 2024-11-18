import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useVisualize from "@/hooks/useVisualize";
import { useRecoilState } from "recoil";
import { sttState } from "@/store/sttState";

const SpeechToText = ({
  onResult,
  inputValue,
  setInputValue,
  onEnd,
}: {
  onEnd: any;
  onResult: (text: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}) => {
  const [recognition, setRecognition] = useState<any>(null);
  const [sttListening, setSttListening] = useRecoilState(sttState);

  const mediaStreamRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // 타이머를 관리할 ref
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
          if (event.error === "network") {
            alert("인터넷 연결을 확인해주세요.");
          }
          recognitionInstance.stop();
          setTimeout(() => {
            recognitionInstance.start();
          }, 500);
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

  // Debugging: recognition state changes
  useEffect(() => {
    console.log("recognition", recognition);
  }, [recognition]);

  // inputValue가 변경될 때마다 타이머를 초기화하는 useEffect
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (inputValue && sttListening) {
      // inputValue가 빈 값이 아닐 때만 3초 타이머 시작
      timeoutRef.current = setTimeout(() => {
        stopRecognition();
        onEnd();
      }, 3000);
    }

    // cleanup: 컴포넌트가 언마운트되거나 inputValue가 변경되면 타이머 정리
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inputValue]);

  const startRecognition = () => {
    setSttListening(true);
    setInputValue("");
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
      // 타이머가 설정되어 있으면 초기화
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else {
      console.log(3);
      setSttListening(false);
    }
  };

  console.log("isListening: ", sttListening);

  return (
    <div className={`flex items-center ${sttListening ? "w-full" : ""}`}>
      <div
        className={`${
          sttListening ? "bottom-0 " : "bottom-[-50rem] opacity-0"
        } max-w-[1280px] transition-all ease-in-out duration-500 bg-primary fixed w-full h-[24rem] left-1/2 transform -translate-x-1/2 rounded-t-[20px] flex flex-col justify-center items-center z-10`}
      >
        <button
          type="button"
          className="border p-1 rounded-full absolute top-4 right-4 bg-white"
          onClick={stopRecognition}
          disabled={!sttListening}
        >
          <Image src="/keyboard.png" alt="keyboard" width={21} height={21} />
        </button>
        <div className="relative w-[6rem] h-[6rem] bg-white rounded-full flex justify-center items-center">
          <div className="w-[9rem] absolute top-3 right-[-1.5rem]">
            <canvas id="visualizer" className="w-full h-full"></canvas>
          </div>
        </div>
        <div className="mt-4 text-2xl px-8 max-h-[14rem] overflow-y-auto">
          <p className="text-white text-center">{inputValue}</p>
        </div>
      </div>
      <button
        type="button"
        className="bg-white p-2 rounded-full ml-4"
        onClick={startRecognition}
        disabled={sttListening}
      >
        <Image src="/voice.png" alt="microphone" width={24} height={24} />
      </button>
    </div>
  );
};

export default SpeechToText;
