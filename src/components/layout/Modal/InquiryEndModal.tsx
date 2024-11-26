import React from "react";

const InquiryEndModal = ({
  handleModal,
  onNextClick,
}: {
  handleModal: (isOpen: boolean) => void;
  onNextClick: () => void;
}) => {
  const title = "문진을 완료하시겠습니까?";
  const description =
    "현재까지 수집한 내용만 원장님께 전달됩니다.\n문진을 완료해 주시면 진료에 큰 도움이 됩니다.";
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <div className="w-[80%] max-w-[440px] min-w-[280px] py-12 px-4 flex flex-col justify-between bg-white rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <h3 className="text-center text-2xl font-semibold">{title}</h3>
        <p className="mt-4 text-[#4E403] leading-6 text-center whitespace-pre-wrap">
          {description}
        </p>
        <div className="w-full flex justify-center gap-2 mt-8">
          <button
            className="w-[9rem] border border-gray-400 py-2 text-base rounded-md"
            onClick={() => handleModal(false)}
          >
            취소
          </button>
          <button
            onClick={() => onNextClick()}
            className="w-[9rem] border py-2 text-base bg-primary text-white rounded-md"
          >
            끝내기
          </button>
        </div>
      </div>
    </>
  );
};

export default InquiryEndModal;
