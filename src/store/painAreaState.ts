import { generateUUID } from '@/utils/generateUUID';
import { atom } from 'recoil';

export const painAreaState = atom<string>({
  key: generateUUID(),
  default: "",
});
