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
    onMessage: (data: string) => void,
    onComplete: () => void
  ) => {
    const endpoint = "https://doctorchat-internal.gentlepie.com/stream";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: message, threadId: threadId }),
      });


      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Stream response body is null");
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder("utf-8");
      let partialChunk = ""; // 끊긴 데이터 처리를 위한 변수

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const text = decoder.decode(value, { stream: true });
        const lines = (partialChunk + text).split("\n");
        partialChunk = lines.pop() || ""; // 마지막 줄이 완전하지 않으면 저장

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              break; // 스트리밍 종료 신호 처리
            }

            try {
              onMessage(data); // 메시지 전달
            } catch (e) {
              console.error("Error in onMessage callback:", e);
            }
          }
        }

        // 첫 번째 데이터 처리 후 바로 로딩 종료
        onComplete();
      }
    } catch (error) {
      console.error("Failed to stream message:", error);
      throw error; // 호출자에게 에러 전달
    }
  };

  return { sendMessage, sendMessageStream };
}
export default useInquiryApi;
