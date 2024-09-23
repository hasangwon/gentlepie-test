import { useEffect } from 'react';
import { MessageType } from '@/types/messageType';
import useChatApi from './useChatApi';
import useChatState from './useChatState';

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

  const { sendMessage, getWelcomeMessage } = useChatApi();


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
  };
};

export default useChat;
