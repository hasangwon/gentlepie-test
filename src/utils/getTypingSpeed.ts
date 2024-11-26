export const getTypingSpeed = (length: number): number => {
  if (length > 1000) {
    return 10;
  } else if (length > 500) {
    return 15;
  } else if (length > 300) {
    return 20;
  } else if (length > 100) {
    return 25;
  } else {
    return 50;
  }
};

export const getInquiryTypingSpeed = (length: number): number => {
  if (length > 300) {
    return 40;
  } else if (length > 250) {
    return 45;
  } else {
    return 50;
  }
};
