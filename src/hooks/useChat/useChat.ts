import { useEffect } from 'react';
import { MessageType } from '@/types/messageType';
import useChatState from './useChatState';
import useChatApi from './useChatApi';

const useChat = () => {
  const {
    session,
    messages,
    setMessages,
    loading,
    setLoading,
    inputValue,
    setInputValue,
  } = useChatState();

  const { sendMessage, rateResponse, getWelcomeMessage } = useChatApi();

  const handleTextButtonClick = (question: string) => {
    setInputValue(question);
    handleSendMessage(question);
  };

  const handleSendMessage = async (messageContent: string) => {
    if (messageContent.trim() === '' || loading) return;

    const newMessage: MessageType = {
      id: Date.now().toString(),
      sender: 'user',
      timestamp: Date.now(),
      type: 'text',
      content: messageContent,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const botResponse = await sendMessage(messageContent);
      botResponse.question = messageContent;
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Failed to fetch bot response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRateResponse = async (
    responseId: string,
    rating: 'like' | 'dislike'
  ) => {
    try {
      await rateResponse(responseId, rating);
      console.log(`Response ${responseId} rated as ${rating}`);
    } catch (error) {
      console.error('Failed to rate response:', error);
    }
  };

  const regenerateMessage = async (message: MessageType) => {
    if (message.question === undefined) return;

    const messageIndex = messages.findIndex((msg) => msg.id + msg.timestamp === message.id + message.timestamp);

    if (messageIndex === -1) return;

    // 로딩 상태를 메시지 위치에 삽입
    const updatedMessages = [...messages];
    updatedMessages[messageIndex] = {
      ...updatedMessages[messageIndex],
      content: '챗봇이 타이핑 중입니다...',
      type: 'loading', // 타입을 로딩으로 변경
    };
    setMessages(updatedMessages);

    try {
      const botResponse = await sendMessage(message.question);

      const newBotMessage: MessageType = {
        id: botResponse.id,
        sender: 'bot',
        timestamp: Date.now(),
        type: botResponse.type,
        content: botResponse.content,
      };

      updatedMessages[messageIndex] = newBotMessage;
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Failed to fetch bot response:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWelcomeMessage().then(res => {
      setMessages([res]);
    });
  }, []);

  return {
    messages,
    inputValue,
    setInputValue,
    loading,
    handleSendMessage,
    handleTextButtonClick,
    handleRateResponse,
    regenerateMessage,
  };
};

export default useChat;
