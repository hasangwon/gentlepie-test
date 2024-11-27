import { NextApiRequest, NextApiResponse } from "next";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

const client = new TextToSpeechClient({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_GCP_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"), // 줄바꿈 처리
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    // Google TTS 요청 보내기
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: "ko-KR", name: "ko-KR-Wavenet-C" }, // 사용할 언어 및 음성
      audioConfig: { audioEncoding: "MP3" }, // MP3 포맷
    });

    if (!response.audioContent) {
      return res.status(500).json({ error: "Audio content not generated" });
    }

    // Base64 인코딩
    const audioBase64 = Buffer.from(response.audioContent).toString("base64");

    res.status(200).json({ audioContent: audioBase64 }); // Base64 데이터 반환
  } catch (error) {
    console.error("Google TTS Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
