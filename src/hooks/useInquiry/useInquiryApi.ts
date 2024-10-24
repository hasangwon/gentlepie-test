import axios from 'axios';
const TEST_URL = "http://192.168.0.23:3000/process"; // 'http://' 추가

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

  return { sendMessage };
}
export default useInquiryApi;
