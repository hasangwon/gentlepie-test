import { useEffect, useRef } from "react";

const useVisualize = (mediaStreamRef: any, sttListening: boolean, setSttListening: any) => {
  const animationRef = useRef<any>(null);
  const audioContextRef = useRef<any>(null);
  const analyserRef = useRef<any>(null);
  const dataArrayRef = useRef<any>(null);
  useEffect(() => {
    if (sttListening) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream;
          const source = audioContextRef.current!.createMediaStreamSource(stream);
          source.connect(analyserRef.current!);
          visualize();
        })
        .catch((error) => {
          console.error("Error accessing microphone: ", error);
          setSttListening(false);
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
  }, [sttListening]);

  const visualize = () => {
    if (!analyserRef.current) return;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    const canvas = document.getElementById("visualizer") as any;

    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = dataArrayRef.current;

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    const numLines = 5; // 막대 개수
    const lineWidth = 20; // 막대 너비
    const lineHeight = 40; // 막대 높이
    const centerY = canvas.height / 2; // 캔버스 중앙
    const indices = [3, 1, 0, 2, 4]; // 가운데부터 확산되는 인덱스 순서
    const barSpacing = 14; // 막대 사이 간격

    // 막대 전체 너비 계산 및 시작 위치 계산
    const totalBarWidth = numLines * lineWidth + (numLines - 1) * barSpacing;
    const startX = (canvas.width - totalBarWidth) / 2;

    for (let i = 0; i < numLines; i++) {
      const sliceStart = Math.floor((indices[i] / numLines) * bufferLength);
      const sliceEnd = Math.floor(((indices[i] + 1) / numLines) * bufferLength);
      const sliceData = dataArray.slice(sliceStart, sliceEnd);
      let averageValue = sliceData.reduce((a: any, b: any) => a + b) / sliceData.length;

      // 막대의 강도 조정
      if (i === 2) {
        averageValue *= 0.8;
      } else if (i === 1 || i === 3) {
        averageValue *= 1.1;
      } else {
        averageValue *= 1.2;
      }

      let barHeight = averageValue / 2;
      barHeight = Math.max(15, barHeight); // 최소값
      barHeight = Math.min(lineHeight, barHeight); // 최대값

      const x = startX + i * (lineWidth + barSpacing); // 막대의 X 위치 계산
      const y = centerY - barHeight; // 막대의 Y 위치 계산

      // 막대 그리기
      canvasCtx.fillStyle = "white"; // 막대 색상 변경
      canvasCtx.beginPath();
      canvasCtx.moveTo(x + 8, y); // 좌측 상단의 둥근 모서리 시작
      canvasCtx.lineTo(x + lineWidth - 8, y); // 상단 직선
      canvasCtx.arcTo(x + lineWidth, y, x + lineWidth, y + 8, 7); // 우측 상단의 둥근 모서리
      canvasCtx.lineTo(x + lineWidth, y + barHeight * 2 - 8); // 우측 직선
      canvasCtx.arcTo(x + lineWidth, y + barHeight * 2, x + lineWidth - 8, y + barHeight * 2, 7); // 우측 하단의 둥근 모서리
      canvasCtx.lineTo(x + 8, y + barHeight * 2); // 하단 직선
      canvasCtx.arcTo(x, y + barHeight * 2, x, y + barHeight * 2 - 8, 7); // 좌측 하단의 둥근 모서리
      canvasCtx.lineTo(x, y + 8); // 좌측 직선
      canvasCtx.arcTo(x, y, x + 8, y, 7); // 좌측 상단의 둥근 모서리
      canvasCtx.fill(); // 채우기
    }

    animationRef.current = requestAnimationFrame(visualize);
  };

  return {
    animationRef,
    audioContextRef,
    analyserRef,
    dataArrayRef,
  };
};

export default useVisualize;
