import axios from 'axios';
const TEST_URL = "https://doctorchat-internal.gentlepie.com/process"; // 'http://' 추가
const useInquiryApi = () => {
  const sendMessage = async (message: string, threadId: string) => {
    try {
      const response = await axios.post(`${TEST_URL}`, { input: message, threadId: threadId });
      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const sendMessageStream = async (
    message: string,
    threadId: string,
    position: string,
    onMessage: (data: string) => void,
    onComplete: (threadId?: string) => void
  ) => {
    const endpoint = "https://doctorchat-internal.gentlepie.com/stream";
    try {
      const response = await fetch(endpoint, {
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
              }
            } catch (e) {
              console.error("Error in onMessage callback:", e);
            }
          }
        }

        onComplete(savedThreadId);
      }
    } catch (error) {
      console.error("Failed to stream message:", error);
      throw error;
    }
  };

  return { sendMessage, sendMessageStream };
}
export default useInquiryApi;
