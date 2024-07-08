// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";

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
      recognitionInstance.interimResults = false; // Show only final results

      recognitionInstance.onresult = (event) => {
        console.log(Array.from(event.results), "nice");
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        if (onResult) {
          onResult(transcript);
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
      // Initialize audio context and analyser
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      dataArrayRef.current = new Uint8Array(
        analyserRef.current.frequencyBinCount
      );

      // Get user media (microphone)
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        visualize();
      });

      return () => {
        // Cleanup
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

    // Update the visualization
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
      <div className={`flex items-center pl-4 ${isListening ? "w-full" : ""}`}>
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
            className="border bg-white p-2 rounded-full"
            onClick={startRecognition}
            disabled={isListening}
          >
            <svg
              className="w-4 h-8"
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              width="640.000000pt"
              height="1280.000000pt"
              viewBox="0 0 640.000000 1280.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                fill="red"
                stroke="none"
              >
                <path d="M2983 12789 c-801 -93 -1454 -686 -1643 -1490 -51 -218 -50 -156 -50 -2199 0 -2013 -1 -1965 45 -2180 83 -391 314 -785 618 -1051 448 -393 1043 -550 1626 -429 711 147 1286 713 1465 1440 58 237 56 173 56 2220 0 1634 -2 1894 -15 1997 -129 985 -946 1712 -1912 1702 -65 -1 -150 -5 -190 -10z" />
                <path d="M520 8553 c0 -1002 4 -1639 10 -1708 32 -350 113 -639 265 -950 125 -257 272 -467 469 -673 379 -394 863 -664 1386 -770 l145 -30 3 -1130 2 -1130 -87 -6 c-261 -21 -606 -74 -839 -132 -674 -164 -1136 -444 -1264 -764 -34 -83 -39 -218 -12 -306 66 -217 273 -410 617 -575 390 -187 884 -306 1495 -361 186 -16 799 -16 980 0 621 57 1105 174 1495 361 344 165 551 358 617 575 27 90 22 224 -12 306 -177 421 -876 749 -1855 869 -88 11 -199 23 -248 27 l-87 6 2 1130 3 1130 135 28 c351 73 652 199 945 395 173 115 307 227 451 377 197 206 344 416 469 673 125 255 200 493 247 781 l22 139 3 1668 4 1667 -200 0 -200 0 -4 -1667 c-3 -1634 -4 -1670 -24 -1778 -49 -259 -105 -433 -212 -650 -234 -474 -625 -851 -1107 -1064 -310 -138 -585 -195 -934 -195 -218 0 -344 14 -535 59 -566 133 -1058 482 -1385 980 -121 185 -246 480 -299 705 -58 244 -55 140 -58 1948 l-4 1662 -199 0 -200 0 0 -1597z" />
              </g>
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default SpeechToText;
