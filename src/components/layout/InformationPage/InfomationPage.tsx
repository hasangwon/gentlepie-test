import React from "react";
import ContentContainer, { Content } from "../../common/atom/ContentContainer";
import ButtonArea from "../../common/atom/ButtonArea";

const InfomationPage = ({
  userName,
  userBirth,
  userPhoneNumber,
  handleName,
  handleBirthFront,
  handleBirthBack,
  handlePhoneNumber,
  handleSubmit,
  handleCancel,
  backRef,
}: {
  userName: string;
  userBirth: string;
  userPhoneNumber: string;
  handleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBirthFront: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBirthBack: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleCancel: () => void;
  backRef: React.RefObject<HTMLInputElement>;
}) => {
  const infoTitle = "기본정보를 입력해 주세요.";
  const securityText =
    "건강보험공단 서버에 연결하기 위한 정보를 요청드립니다.\n제공하신 정보는 안전하게 보안 처리됩니다.";

  return (
    <ContentContainer>
      <Content title={infoTitle}>
        <p className="text-xs mt-8">{securityText}</p>
        <form className="w-full flex justify-center mt-12">
          <div className="flex flex-col gap-12 sm:mr-12 font-semibold">
            <h3 className="text-[20px] sm:text-[28px] w-[10rem] select-none h-[2.5rem] flex items-center justify-start">
              이름
            </h3>
            <h3 className="text-[20px] sm:text-[28px] w-[10rem] select-none h-[2.5rem] flex items-center justify-start">
              주민등록번호
            </h3>
            <h3 className="text-[20px] sm:text-[28px] w-[10rem] select-none h-[2.5rem] flex items-center justify-start">
              전화번호
            </h3>
          </div>

          <div className="flex flex-col gap-12 text-sm leading-[22px]">
            <input
              type="text"
              value={userName}
              onChange={handleName}
              placeholder="입력"
              autoComplete="off"
              className="text-base border responsive_width border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-left"
            />
            <div className="responsive_width relative flex items-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                value={userBirth.slice(0, 6)}
                onChange={handleBirthFront}
                placeholder="앞 6자리"
                autoComplete="off"
                className="text-base w-[45%] flex-1 border border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-left"
              />
              <input
                ref={backRef}
                type="text"
                inputMode="numeric"
                value={userBirth.slice(6, 13)}
                onChange={handleBirthBack}
                placeholder="뒤 7자리"
                autoComplete="off"
                className="text-base w-[45%] flex-1 border border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-left"
              />
            </div>
            <input
              type="text"
              inputMode="numeric"
              value={userPhoneNumber}
              onChange={handlePhoneNumber}
              placeholder="휴대 전화번호"
              autoComplete="off"
              className="text-base border responsive_width border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-left"
            />
          </div>
        </form>
      </Content>
      <ButtonArea
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        nextButtonText={"입력 완료"}
        cancelButtonText={"취소"}
      />
    </ContentContainer>
  );
};

export default InfomationPage;
