# chatbot-ui

## 시작

```bash
npm install
npm run dev
```

## chatbot-ui 개요
챗봇 UI를 반복적으로 개발 해야하는 환경에 놓여져서 기본적으로 사용할 수 있는 챗봇 UI를 구현함.?
지속적으로 업데이트 해야하며, 기본적으로 내가 사용하기 유리하게 개발됨.


## 기술스택

- Next.js, Typescript, Recoil, TailwindCSS
- react-slick(캐러셀 구현)

## 디렉토리 구조

```
src/
├── components/
│   ├── common/                # 재사용 가능한 컴포넌트
│   └── layout/                # UI
│   │   ├── ChatBox/
│   │   ├── ChatInput/
│   │   └── Header/
├── hooks/                     # Custom Hooks
│   ├── useChat/
│   └── useMenu/
├── pages/                     # api, 상태 관리 디렉토리 
│   ├── _app.ts
│   ├── _document.ts
│   └── index.ts
├── store/                     # Recoil State
│   ├── messageState.ts
│   └── sessionState.ts
├── styles/                    # 스타일
│   └── globals.css
├── types/                     # 타입 정의
│   └── messageType.ts
├── utils/                     # 유틸리티 함수
│   ├── generateUUID.ts
│   └── getTypingSpeed.ts
└── README.md
```
