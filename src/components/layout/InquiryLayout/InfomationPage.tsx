import React from "react";

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
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center z-10 max-h-full">
      <p className="text-center text-[30px] font-semibold select-none">
        환자의 기본정보를
        <br />
        입력해주세요.
      </p>
      <form className="w-full flex flex-col items-center mt-8 gap-6">
        <div className="w-full flex justify-center items-center px-4">
          <h3 className="text-[24px] sm:text-[30px] font-semibold sm:mr-12 mr-4 w-[6.5rem] select-none">
            이름
          </h3>
          <input
            type="text"
            value={userName}
            onChange={handleName}
            placeholder="입력"
            className="border border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-center w-[12rem]"
          />
        </div>
        <div className="w-full flex justify-center items-center px-4">
          <h3 className="text-[24px] sm:text-[30px] font-semibold sm:mr-12 mr-4 w-[6.5rem] select-none">
            주민번호
          </h3>
          <input
            type="text"
            value={userBirth.slice(0, 6)}
            onChange={handleBirthFront}
            placeholder="앞 6자리"
            className="border border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-center w-[5.75rem] mr-2"
          />
          <input
            type="password"
            value={userBirth.slice(6, 13)}
            onChange={handleBirthBack}
            placeholder="뒤 7자리"
            className="border border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-center w-[5.75rem]"
          />
        </div>

        <div className="w-full flex justify-center items-center px-4">
          <h3 className="text-[24px] sm:text-[30px] font-semibold sm:mr-12 mr-4 w-[6.5rem] select-none">
            전화번호
          </h3>
          <input
            type="text"
            value={userPhoneNumber}
            onChange={handlePhoneNumber}
            placeholder="휴대폰 번호 11자리"
            className="border border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-center w-[12rem]"
          />
        </div>
      </form>
      <div className="flex justify-center">
        <button
          onClick={handleCancel}
          className="text-lg px-8 py-2 border border-gentle-light rounded-md mt-[6rem] hover:bg-gentle-light sm:mr-8 mr-2"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="text-lg px-20 py-2 border border-gentle-light rounded-md mt-[6rem] hover:bg-gentle-light"
        >
          입력 완료
        </button>
      </div>
    </div>
  );
};

export default InfomationPage;
