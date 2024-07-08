import { atom } from 'recoil';
import { MessageType } from '@/types/messageType';

export const messagesState = atom<MessageType[]>({
  key: 'messagesState',
  default: [],
});
