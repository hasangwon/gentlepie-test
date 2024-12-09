
export const printError = (error: string) => {
  switch (error) {
    case "no-speech":
      return console.log("음성이 감지되지 않았습니다. 다시 시도해주세요.");
      break;
    case "aborted":
      return console.log("음성 인식이 중단되었습니다.");
      break;
    case "network":
      return alert("인터넷 연결을 확인해주세요.");
      break;

    case "not-allowed":
      return alert("브라우저의 마이크 권한을 허용해주세요.");
      break;
    case "service-not-allowed":
      return alert("브라우저의 음성 인식 권한을 허용해주세요.");
      break;
    default:
      return alert(`음성 인식 중 알 수 없는 에러가 발생했습니다: ${error}`);
      break;
  }
};
