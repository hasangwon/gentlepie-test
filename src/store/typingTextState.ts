import { generateUUID } from "@/utils/generateUUID";
import { atom } from "recoil";

export const typingTextState = atom<string>({
  key: generateUUID(),
  default: "",
});
