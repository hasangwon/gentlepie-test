export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "tts-1", // TTS 모델 지정
        voice: "echo", // 사용할 목소리
        input: text, // 변환할 텍스트
        response_format: "mp3", // 오디오 포맷
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    // mp3 오디오 파일 형식으로 데이터 가져오기
    const audioData = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioData).toString("base64"); // Base64 인코딩

    res.status(200).json({ audioContent: audioBase64 }); // Base64 데이터 반환
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
