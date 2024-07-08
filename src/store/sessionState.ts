import { generateUUID } from "@/utils/generateUUID";
import { atom } from "recoil";

export const sessionState = atom<string>({
  key: generateUUID(),
  default: generateUUID(),
});
