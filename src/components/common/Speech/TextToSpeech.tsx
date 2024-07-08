import React, { useState } from "react";

const TextToSpeech = ({
  text,
  speakLabel = "Speak",
  stopLabel = "Stop",
}: {
  text: string;
  speakLabel?: string;
  stopLabel?: string;
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR"; // Set language to Korean
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="flex w-full justify-end mt-2 items-center">
      {isSpeaking ? (
        <button
          className="border bg-white rounded-2xl px-2"
          onClick={handleStop}
          disabled={!isSpeaking}
        >
          {stopLabel}
        </button>
      ) : (
        <button
          className="border bg-white rounded-2xl px-2"
          onClick={handleSpeak}
          disabled={isSpeaking || !text}
        >
          {speakLabel}
        </button>
      )}
    </div>
  );
};

export default TextToSpeech;
