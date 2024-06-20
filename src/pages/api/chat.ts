import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const API_BASE_URL = 'https://nice.com/api';
const mock = new MockAdapter(axios);

mock.onPost(`${API_BASE_URL}/chat/send`).reply(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, {
        id: 'bot-123',
        type: 'text',
        content: '이것은 모킹된 응답입니다. 무엇을 도와드릴까요?',
        buttons: [],
        menu: [],
      }]);
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

export const sendMessage = async (message: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/send`, { message });
    return response.data;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
};

export const rateResponse = async (responseId: string, rating: 'like' | 'dislike') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/rate`, { responseId, rating });
    return response.data;
  } catch (error) {
    console.error('Failed to rate response:', error);
    throw error;
  }
};
