/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import Head from "next/head";
import Header from "@/components/common/Element/Header";
import InquryInput from "@/components/layout/InquiryLayout/InquiryInput";
import BotMessage from "@/components/layout/InquiryLayout/BotMessage";
import useInquiry from "@/hooks/useInquiry";

const Inquiry: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [userName, setUserName] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const {
    inputValue,
    setInputValue,
    botMessage,
    isLoading,
    handleSendMessage,
    audioRef,
  } = useInquiry();

  const initUserInfo = () => {
    setUserName("");
    setUserBirth("");
    setUserPhoneNumber("");
  };

  console.log("run");
  return (
    <>
      <Head>
        <title>GENTLEPIE-INQUIRY</title>
      </Head>

      <div className="w-full h-full flex justify-center bg-gray-100 overflow-hidden">
        <div className="w-full h-full flex flex-col items-between min-w-[240px] max-w-[1280px] bg-white relative">
          <Header title={"문진 챗봇"} titleStyle={""} />
          <div className="absolute top-[-4rem] right-0 w-[50%] min-w-[16rem] h-auto">
            <img
              src="/gradient_circle.svg"
              alt="logo"
              className="w-full h-auto"
            />
          </div>
          {pageIndex === 1 ? (
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
                  setPageIndex(2);
                }}
                className="text-lg px-4 py-2 border border-gentle-light rounded-md mt-[6rem] hover:bg-gentle-light"
              >
                개인정보 수집 동의함
              </button>
            </div>
          ) : pageIndex === 2 ? (
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
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        setUserName(e.target.value);
                      }
                    }}
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
                    onChange={(e) => {
                      const input = e.target.value.replace(/[^0-9]/g, "");
                      setUserBirth(input.slice(0, 6));
                    }}
                    placeholder="앞 6자리"
                    className="border border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-center w-[5.75rem] mr-2"
                  />
                  <input
                    type="password"
                    value={userBirth.slice(6, 13)}
                    onChange={(e) => {
                      const input = e.target.value.replace(/[^0-9]/g, "");
                      setUserBirth(
                        (prev) => prev.slice(0, 6) + input.slice(0, 7)
                      );
                    }}
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
                    onChange={(e) => {
                      const input = e.target.value.replace(/[^0-9]/g, "");
                      let formattedInput = input;

                      if (input.length > 3 && input.length <= 7) {
                        formattedInput =
                          input.slice(0, 3) + "-" + input.slice(3);
                      } else if (input.length > 7) {
                        formattedInput =
                          input.slice(0, 3) +
                          "-" +
                          input.slice(3, 7) +
                          "-" +
                          input.slice(7, 11);
                      }
                      if (formattedInput.length <= 13) {
                        setUserPhoneNumber(formattedInput);
                      }
                    }}
                    placeholder="휴대폰 번호 11자리"
                    className="border border-gentle-light rounded-md px-4 py-2 outline-none placeholder:text-center w-[12rem]"
                  />
                </div>
              </form>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setPageIndex(1);
                    initUserInfo();
                  }}
                  className="text-lg px-8 py-2 border border-gentle-light rounded-md mt-[6rem] hover:bg-gentle-light sm:mr-8 mr-2"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    if (
                      userName === "" ||
                      userBirth === "" ||
                      userPhoneNumber === ""
                    ) {
                      alert("모든 정보를 입력해주세요.");
                      return;
                    }
                    setPageIndex(3);
                  }}
                  className="text-lg px-20 py-2 border border-gentle-light rounded-md mt-[6rem] hover:bg-gentle-light"
                >
                  입력 완료
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-transparent h-[calc(100%-3.75rem)] w-full flex flex-col items-center justify-center z-10">
              <div className="h-full overflow-y-auto w-full">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="inquiry_loader"></div>
                  </div>
                ) : (
                  <>
                    <BotMessage
                      message={botMessage}
                      scrollToBottom={scrollToBottom}
                      audioRef={audioRef}
                    />
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>
              <InquryInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Inquiry;
