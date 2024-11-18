import { useState, useRef } from "react";

export default function TTSComponent() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

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

        // 오디오 URL 설정 후 자동 재생
        if (audioRef.current) {
          audioRef.current.src = newAudioUrl;
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        console.log(data);
        alert("오디오 생성 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.log(err);
      alert("오디오 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 재생이 끝나면 중지 상태로 변경하는 이벤트 핸들러
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-4 bg-white shadow-md rounded-md"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="텍스트를 입력하세요"
          rows={4}
          cols={50}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded-md ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "생성 중..." : "텍스트 읽기"}
        </button>
      </form>

      {/* 재생/중지 버튼 표시 */}
      {audioUrl && (
        <div className="mt-6 w-full max-w-md p-4 bg-white shadow-md rounded-md flex flex-col items-center">
          <button
            onClick={togglePlayPause}
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {isPlaying ? "중지" : "재생"}
          </button>
        </div>
      )}

      {/* audio 태그 숨기기, 재생 종료 이벤트 추가 */}
      <audio
        ref={audioRef}
        style={{ display: "none" }}
        onEnded={handleAudioEnded}
      />
    </div>
  );
}
