import { BASE_PATH } from "@/utils/constants";

const useInquiryApi = () => {
  const sendMessageStream = async (message: string, threadId: string, position: string, onMessage: (data: string) => void, onComplete: (threadId?: string) => void, onEnd: (finalText: string) => void) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_API_URL}/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: message, position: position, threadId: threadId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Stream response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let partialChunk = "";
      let savedThreadId: string | undefined;
      let firstThreadSaved = false;
      let finalText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });

        const lines = (partialChunk + text).split("\n");
        partialChunk = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              break;
            }

            try {
              if (!firstThreadSaved && data.startsWith("[THREAD]")) {
                savedThreadId = data.replace("[THREAD] ", "").trim();
                firstThreadSaved = true;
              } else {
                onMessage(data);
                finalText += data;
              }
            } catch (e) {
              console.error("Error in onMessage callback:", e);
            }
          }
        }

        onComplete(savedThreadId);
      }

      onEnd(finalText.trim());
    } catch (error) {
      console.error("Failed to stream message:", error);
      throw error;
    }
  };

  return { sendMessageStream };
};
export default useInquiryApi;
