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

  const rateResponse = async (responseId: string, rating: 'like' | 'dislike') => {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat/rate`, { responseId, rating });
      return response.data;
    } catch (error) {
      console.error('Failed to rate response:', error);
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

  return { sendMessage, rateResponse, getWelcomeMessage };
}
export default useChatApi;

mock.onPost(`${API_BASE_URL}/chat/send`).reply((config) => {
  const requestData = JSON.parse(config.data);
  const message = requestData.message;

  let response;

  if (message === "예시 질문 1") {
    response = {
      id: Date.now().toString(),
      sender: "bot",
      timestamp: Date.now(),
      type: 'buttonList',
      content: '이것은 예시 질문 1에 대한 응답입니다. 무엇을 도와드릴까요?',
      buttons: ["질문 1-1", "질문 1-2"],
      menu: [],
    };
  } else if (message === "예시 질문 2") {
    response = {
      id: Date.now().toString(),
      sender: "bot",
      timestamp: Date.now(),
      type: 'menuList',
      content: '이것은 예시 질문 2에 대한 응답입니다. 무엇을 도와드릴까요?',
      buttons: [],
      menu: [{ title: '질문 2-1', buttons: ['상세 질문 1', '상세 질문 2', '상세 질문 3'] }, { title: '질문 2-2', buttons: ['상세 질문 5', '상세 질문 6', '상세 질문 7'] }, { title: '질문 2-3', buttons: ['상세 질문 8', '상세 질문 9', '상세 질문 10'] }],
    };
  } else {
    response = {
      id: Date.now().toString(),
      sender: "bot",
      timestamp: Date.now(),
      type: 'text',
      content: '이것은 기본 응답입니다. 무엇을 도와드릴까요?',
      buttons: [],
      menu: [],
    };
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
