import { MessageType } from '@/types/messageType';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const API_BASE_URL = 'https://nice.com/api';
const mock = new MockAdapter(axios);

const useChatApi = () => {
  const sendMessage = async (message: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat/send`, { message });
      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const getWelcomeMessage = async () => {
    return {
      id: Date.now().toString(),
      sender: 'bot',
      timestamp: Date.now(),
      type: 'buttonList',
      content: '안녕하세요! 무엇을 도와드릴까요?',
      buttons: ['예시 질문 1', '예시 질문 2'],
      menu: [],
    } as MessageType;
  }

  return { sendMessage, getWelcomeMessage };
}
export default useChatApi;

mock.onPost(`${API_BASE_URL}/chat/send`).reply((config) => {
  const requestData = JSON.parse(config.data);
  let response;
  response = {
    id: Date.now().toString(),
    sender: "bot",
    timestamp: Date.now(),
    type: 'text',
    content: '이것은 기본 응답입니다. 무엇을 도와드릴까요?',
    buttons: [],
    menu: [],
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, response]);
    }, 1000);
  });
});

mock.onPost(`${API_BASE_URL}/chat/rate`).reply(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, { success: true }]);
    }, 1000);
  });
});
