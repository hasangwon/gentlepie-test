export const getTypingSpeed = (length: number): number => {
  if (length > 300) {
    return 10;
  } else if (length > 200) {
    return 15;
  } else if (length > 100) {
    return 25;
  } else {
    return 50;
  }
};
