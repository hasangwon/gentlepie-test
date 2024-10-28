import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SpeechToText = ({
  onResult,
  inputValue,
  setInputValue,
}: {
  onResult: any;
  inputValue: string;
  setInputValue: any;
}) => {
  const [recognition, setRecognition] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const animationRef = useRef<any>(null);
  const audioContextRef = useRef<any>(null);
  const analyserRef = useRef<any>(null);
  const dataArrayRef = useRef<any>(null);
  const mediaStreamRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = "ko-KR"; // Set language to Korean
      recognitionInstance.continuous = true; // Keep recognizing even if there's a pause
      recognitionInstance.interimResults = true; // Show interim results for real-time updates

      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = ""; // 중간 텍스트
        let finalTranscript = ""; // 최종 텍스트

        // 모든 결과들을 순회하며 중간 텍스트와 최종 텍스트를 분리
        for (let i = 0; i < event.results.length; i++) {
          const transcriptSegment = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptSegment;
          } else {
            interimTranscript += transcriptSegment;
          }
        }

        // 중간 텍스트를 즉시 업데이트
        if (onResult) {
          onResult(interimTranscript);
        }

        // 최종 텍스트가 있으면 전체 업데이트
        if (finalTranscript) {
          onResult(finalTranscript);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error detected: " + event.error);
        if (event.error === "no-speech") {
          console.log("No speech detected, restarting recognition...");
          recognitionInstance.stop(); // 먼저 음성 인식을 멈추고
          setTimeout(() => {
            recognitionInstance.start(); // 잠시 후 다시 시작
          }, 500); // 1초 후 재시작
        }
      };

      setRecognition(() => recognitionInstance);
    } else {
      alert("Your browser does not support Web Speech API.");
    }
  }, []);

  useEffect(() => {
    if (isListening) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      dataArrayRef.current = new Uint8Array(
        analyserRef.current.frequencyBinCount
      );

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream;
          const source =
            audioContextRef.current!.createMediaStreamSource(stream);
          source.connect(analyserRef.current!);
          visualize();
        })
        .catch((error) => {
          console.error("Error accessing microphone: ", error);
          setIsListening(false);
        });

      return () => {
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isListening]);

  const visualize = () => {
    if (!analyserRef.current) return;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    const canvas = document.getElementById("visualizer") as any;

    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = dataArrayRef.current; // 주파수 데이터 배열

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    const numLines = 7; // 막대 개수
    const lineWidth = canvas.width / numLines - 30; // 막대 너비
    const centerY = canvas.height / 2; // 캔버스 중앙
    const indices = [4, 2, 0, 1, 3, 5, 6]; // 가운데부터 확산되는 인덱스 순서
    const barSpacing = 8; // 막대 사이 간격

    // 막대 전체 너비 계산 및 시작 위치 계산
    const totalBarWidth = numLines * lineWidth + (numLines - 1) * barSpacing;
    const startX = (canvas.width - totalBarWidth) / 2;

    for (let i = 0; i < numLines; i++) {
      const sliceStart = Math.floor((indices[i] / numLines) * bufferLength);
      const sliceEnd = Math.floor(((indices[i] + 1) / numLines) * bufferLength);
      const sliceData = dataArray.slice(sliceStart, sliceEnd);
      let averageValue =
        sliceData.reduce((a: any, b: any) => a + b) / sliceData.length;

      // 막대의 강도 조정
      if (i === 2) {
        averageValue *= 0.8;
      } else if (i === 1 || i === 3) {
        averageValue *= 1.1;
      } else if (i === 0 || i === 4) {
        averageValue *= 1.2;
      } else {
        averageValue *= 1.3;
      }

      let barHeight = averageValue / 2;
      barHeight = Math.max(15, barHeight); // 최소값
      barHeight = Math.min(70, barHeight); // 최대값

      const x = startX + i * (lineWidth + barSpacing); // 막대의 X 위치 계산
      const y = centerY - barHeight; // 막대의 Y 위치 계산

      // 막대 그리기
      canvasCtx.fillStyle = "black";
      canvasCtx.beginPath();
      canvasCtx.moveTo(x + 8, y); // 좌측 상단의 둥근 모서리 시작
      canvasCtx.lineTo(x + lineWidth - 8, y); // 상단 직선
      canvasCtx.arcTo(x + lineWidth, y, x + lineWidth, y + 8, 7); // 우측 상단의 둥근 모서리
      canvasCtx.lineTo(x + lineWidth, y + barHeight * 2 - 8); // 우측 직선
      canvasCtx.arcTo(
        x + lineWidth,
        y + barHeight * 2,
        x + lineWidth - 8,
        y + barHeight * 2,
        7
      ); // 우측 하단의 둥근 모서리
      canvasCtx.lineTo(x + 8, y + barHeight * 2); // 하단 직선
      canvasCtx.arcTo(x, y + barHeight * 2, x, y + barHeight * 2 - 8, 7); // 좌측 하단의 둥근 모서리
      canvasCtx.lineTo(x, y + 8); // 좌측 직선
      canvasCtx.arcTo(x, y, x + 8, y, 7); // 좌측 상단의 둥근 모서리
      canvasCtx.fill(); // 채우기
    }

    animationRef.current = requestAnimationFrame(visualize);
  };

  const startRecognition = () => {
    if (recognition && !isListening) {
      recognition.start();
      setIsListening(true);
      setInputValue("");
    }
  };

  const stopRecognition = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);

      // 마이크 스트림을 중지하여 녹음 표시 제거
      if (mediaStreamRef.current) {
        mediaStreamRef.current
          .getTracks()
          .forEach((track: any) => track.stop());
      }
    }
  };

  return (
    <>
      <div className={`flex items-center ${isListening ? "w-full" : ""}`}>
        <div
          className={`${
            isListening ? "bottom-0 " : "bottom-[-50rem] opacity-0"
          } max-w-[1280px] transition-all ease-in-out duration-500 bg-primary fixed w-full h-[24rem] left-1/2 transform -translate-x-1/2 rounded-t-[20px] flex flex-col justify-center items-center z-10`}
        >
          <button
            type="button"
            className="border p-1 rounded-full absolute top-4 right-4 bg-white"
            onClick={stopRecognition}
            disabled={!isListening}
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
          disabled={isListening}
        >
          <Image src="/voice.png" alt="microphone" width={24} height={24} />
        </button>
      </div>
    </>
  );
};

export default SpeechToText;
