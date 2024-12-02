export const formatPainArea = (painArea: string) => {
  switch (painArea) {
    case "목 통증, 두통":
      return "두통";
    case "어깨, 가슴, 등 통증":
      return "상부몸통";
    case "팔꿈치, 손목, 손 통증":
      return "팔";
    case "허리, 골반, 고관절 통증":
      return "허리";
    case "허벅지와 무릎 통증":
      return "다리";
    case "하퇴부와 발목, 발 통증":
      return "발";
    case "암 통증":
      return "암";
    default:
      return "";
  }
}
