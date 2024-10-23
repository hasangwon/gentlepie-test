/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/common/Element/Header";
import InquryInput from "@/components/layout/InquiryLayout/InquiryInput";

const Inquiry: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [userName, setUserName] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [botMessages, setBotMessages] = useState([]);

  const initUserInfo = () => {
    setUserName("");
    setUserBirth("");
    setUserPhoneNumber("");
  };

  return (
    <>
      <Head>
        <title>GENTLEPIE-INQUIRY</title>
      </Head>
      <div className="w-full h-full flex justify-center bg-gray-100">
        <div className="w-full h-full flex flex-col items-center min-w-[320px] max-w-[720px] bg-white relative">
          <Header title={"문진 챗봇"} titleStyle={""} />
          <div className="absolute top-[-4rem] right-0 w-[50%] min-w-[16rem] h-auto">
            <img src="/gradient_circle.svg" alt="logo" className="w-full h-auto" />
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            {pageIndex === 1 ? (
              <>
                <p className="text-center text-[30px] font-semibold">
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
                    setPageIndex(2);
                  }}
                  className="text-lg px-4 py-2 border border-gentle-light rounded-md mt-[6rem] hover:bg-gentle-light"
                >
                  개인정보 수집 동의함
                </button>
              </>
            ) : pageIndex === 2 ? (
              <>
                <p className="text-center text-[30px] font-semibold">
                  환자의 기본정보를
                  <br />
                  입력해주세요.
                </p>
                <form className="w-full flex flex-col items-center mt-8 gap-6">
                  <div className="flex items-center">
                    <h3 className="text-[30px] font-semibold mr-8 w-[6.5rem]">이름</h3>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => {
                        if (e.target.value.length <= 10) {
                          setUserName(e.target.value);
                        }
                      }}
                      placeholder="입력"
                      className="border border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-center"
                    />
                  </div>
                  <div className="flex items-center">
                    <h3 className="text-[30px] font-semibold mr-8 w-[6.5rem]">생년월일</h3>
                    <input
                      type="text"
                      value={userBirth}
                      onChange={(e) => {
                        const birthRegex = /^[0-9.-]{0,10}$/; // 숫자, `.` 및 `-`만 허용, 최대 10자
                        if (birthRegex.test(e.target.value)) {
                          setUserBirth(e.target.value);
                        }
                      }}
                      placeholder="YYYY.MM.DD"
                      className="border border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-center"
                    />
                  </div>
                  <div className="flex items-center">
                    <h3 className="text-[30px] font-semibold mr-8 w-[6.5rem]">전화번호</h3>
                    <input
                      type="text"
                      value={userPhoneNumber}
                      onChange={(e) => {
                        const phoneRegex = /^[0-9.-]{0,13}$/; // 숫자, `.` 및 `-`만 허용, 최대 13자
                        if (phoneRegex.test(e.target.value)) {
                          setUserPhoneNumber(e.target.value);
                        }
                      }}
                      placeholder="000-0000-0000"
                      className="border border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-center"
                    />
                  </div>
                </form>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setPageIndex(1);
                      initUserInfo();
                    }}
                    className="text-lg px-8 py-2 border border-gentle-light rounded-md mt-[6rem] hover:bg-gentle-light mr-4"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => {
                      setPageIndex(3);
                    }}
                    className="text-lg px-20 py-2 border border-gentle-light rounded-md mt-[6rem] hover:bg-gentle-light"
                  >
                    입력 완료
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-transparent w-full h-full z-10">
                {/* 여기 커스터마이징 작업 중 */}
                <div className="border m-8 p-4 h-[30rem] bg-gray-100 rounded-xl">{inputValue}</div>
                <InquryInput inputValue={inputValue} setInputValue={setInputValue} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inquiry;
