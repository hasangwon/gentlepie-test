import React from "react";

const AgreementPage = ({
  handlePageIndex,
}: {
  handlePageIndex: (index: number) => void;
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center z-10 max-h-full">
      <p className="text-center text-[30px] font-semibold select-none">
        안녕하세요.
        <br />
        문진 챗봇입니다.
        <br /> <br />
        개인정보 동의 후
        <br />
        개인정보 질의와
        <br />
        문진을 시작하겠습니다.
      </p>
      <button
        onClick={() => {
          handlePageIndex(2);
        }}
        className="text-lg px-4 py-2 border border-gentle-light rounded-md mt-[6rem] hover:bg-gentle-light"
      >
        개인정보 수집 동의함
      </button>
    </div>
  );
};

export default AgreementPage;
