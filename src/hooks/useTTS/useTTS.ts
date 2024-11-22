import { useEffect, useRef, useState } from "react";

const useTTS = () => {

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchTTS = async (text: string) => {
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      if (response.ok) {
        const audioBase64 = data.audioContent;
        const audioBlob = new Blob(
          [Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0))],
          { type: "audio/mp3" }
        );
        const newAudioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(newAudioUrl);
      } else {
        console.error("오디오 생성 중 오류가 발생했습니다.", data);
      }
    } catch (err) {
      console.error("오디오 생성 중 오류가 발생했습니다.", err);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  }, [audioUrl]);

  return {
    fetchTTS,
    audioRef,
  }
}

export default useTTS;