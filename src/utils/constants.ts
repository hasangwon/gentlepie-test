export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const chatbotName = "행복한 H 문진 챗봇";
export const doctorName = "김정훈 대표원장";

export const AgreementOpeningText =
  "안녕하세요.\n행복한 H 문진 챗봇입니다.\n\n이 챗봇은 환자 상태를 미리 파악해\n신속하고 정확한 진단을\n돕기 위해 운영됩니다.\n\n개인정보 동의 후\n질문과 문진을\n시작하겠습니다.";
export const AgreementDisareeText =
  "개인정보 수집 및 활용에\n동의하지 않으시면\n\n서비스 이용이\n제한될 수 있습니다.\n\n동의 후 다시 시도해주세요.";

export const infoTitle = "기본정보를 입력해 주세요.";
export const infoSecurityText =
  "건강보험공단 서버에 연결하기 위한 정보를 요청드립니다.\n제공하신 정보는 안전하게 보안 처리됩니다.";

export const painAreas = [
  "목 통증, 두통",
  "어깨, 가슴, 등 통증",
  "팔꿈치, 손목, 손 통증",
  "허리, 골반, 고관절 통증",
  "허벅지와 무릎 통증",
  "하퇴부와 발목, 발 통증",
  "암 통증",
];
export const painTitle = "먼저 통증 부위를\n선택해 주세요.";
export const painDescription =
  "문진은 선택한 부위에 따라\n최대 18개 항목으로 구성됩니다.";

export const firstMessage = "문진을 시작하겠습니다.\n저에게 말씀하신 모든 내용이 진료에 중요하게 활용됩니다.\n통증 위치부터 구체적으로 말씀해주세요."
export const errorMessage = "죄송합니다. 서버와의 통신에 문제가 발생했습니다.\n새로고침 후 다시 시도해주세요."


export const EndModalTitle = "문진을 완료하시겠습니까?";
export const EndModalDescription =
  "현재까지 수집한 내용만 원장님께 전달됩니다.\n문진을 완료해 주시면 진료에 큰 도움이 됩니다.";

export const EndTitle = "감사합니다.\n문진이 완료되었습니다.";
export const EndDescription = "입력한 내용은\n원장님께 전달됩니다.";
