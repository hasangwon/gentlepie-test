// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SpeechToText = ({ onResult, isListening, setIsListening }) => {
  const [recognition, setRecognition] = useState(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = "ko-KR"; // Set language to Korean
      recognitionInstance.continuous = true; // Keep recognizing even if there's a pause
      recognitionInstance.interimResults = true; // Show interim results for real-time updates

      recognitionInstance.onresult = (event) => {
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

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error detected: " + event.error);
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

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        visualize();
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

    const canvas = document.getElementById("visualizer");
    const canvasCtx = canvas.getContext("2d");
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArrayRef.current.length) * 2.5;
    let barHeight;
    const centerY = canvas.height / 2;
    let x = 0;

    for (let i = 0; i < dataArrayRef.current.length; i++) {
      barHeight = dataArrayRef.current[i] / 2;
      canvasCtx.fillStyle = "rgb(50,50,200)";
      canvasCtx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);
      x += barWidth + 1;
    }

    animationRef.current = requestAnimationFrame(visualize);
  };

  const startRecognition = () => {
    if (recognition && !isListening) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopRecognition = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <>
      <div className={`flex items-center ${isListening ? "w-full" : ""}`}>
        {isListening ? (
          <>
            <button
              type="button"
              className="border p-2 rounded-full"
              onClick={stopRecognition}
              disabled={!isListening}
            >
              <div className="w-2 h-2 bg-black"></div>
            </button>
            <canvas id="visualizer" className="w-full h-full px-8"></canvas>
          </>
        ) : (
          <button
            type="button"
            className="bg-white p-1 rounded-full"
            onClick={startRecognition}
            disabled={isListening}
          >
            <Image src="/voice.png" alt="microphone" width={20} height={20} />
          </button>
        )}
      </div>
    </>
  );
};

export default SpeechToText;
