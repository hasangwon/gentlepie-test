import { BASE_PATH } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";

const useTTS = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isTTSloading, setIsTTSloading] = useState(false);

  const fetchTTS = async (text: string): Promise<string> => {
    setIsTTSloading(true);
    try {
      const response = await fetch(`${BASE_PATH}/api/tts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      if (response.ok) {
        const audioBase64 = data.audioContent;
        const audioBlob = new Blob([Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0))], { type: "audio/mp3" });
        const newAudioUrl = URL.createObjectURL(audioBlob);
        setIsTTSloading(false);

        if (audioRef.current?.src) {
          console.log("Releasing old Blob URL:", audioRef.current.src);
          URL.revokeObjectURL(audioRef.current.src);
        }

        if (newAudioUrl && audioRef.current) {
          audioRef.current.src = newAudioUrl;
          audioRef.current.play().then(() => {
            console.log("audio play success")
          }).catch((err) => {
            console.error("audio play error", err)
            if (newAudioUrl && audioRef.current) {
              audioRef.current.src = newAudioUrl;
              audioRef.current.load();
              setTimeout(() => {
                audioRef.current!.play().catch((retryErr) => {
                  console.error("오디오 재생 재시도 실패:", retryErr);
                  alert("오디오 재생에 실패했습니다. 다시 시도해주세요.");
                });
              }, 1000);
            } else {
              console.error("오디오 URL이 없습니다.");
              alert("오디오 URL이 없습니다.");
            }
          })
        }
        return newAudioUrl;
      } else {
        console.error("TTS 생성 오류:", data);
        alert(`TTS 생성 오류가 발생했습니다. ${data}`);
        setIsTTSloading(false);
        return "";
      }
    } catch (err) {
      console.error("TTS 요청 실패:", err);
      alert("TTS 요청에 실패했습니다.");
      setIsTTSloading(false);
      return "";
    }
  };

  return {
    fetchTTS,
    audioRef,
    isTTSloading,
  };
};

export default useTTS;
