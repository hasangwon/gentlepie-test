import { generateUUID } from "@/utils/generateUUID";
import { atom } from "recoil";

export const sttState = atom<boolean>({
  key: generateUUID(),
  default: false,
});
