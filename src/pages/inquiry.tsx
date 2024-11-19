/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Header from "@/components/layout/InquiryLayout/Header";
import AgreementPage from "@/components/layout/InquiryLayout/AgreementPage";
import InfomationPage from "@/components/layout/InquiryLayout/InfomationPage";
import InquiryChatPage from "@/components/layout/InquiryLayout/InquiryChatPage";

import useInquiry from "@/hooks/inquiry/useInquiry";
import useInquiryPageControl from "@/hooks/inquiry/useInquiryPageControl";
import useTTS from "@/hooks/inquiry/useTTS";
import useUserInfo from "@/hooks/inquiry/useUserInfo";

const Inquiry: React.FC = () => {
  const {
    inputValue,
    setInputValue,
    botMessage,
    isLoading,
    handleSendMessage,
    handleSendMessageStream,
  } = useInquiry();
  const { pageIndex, messagesEndRef, scrollToBottom, handlePageIndex } =
    useInquiryPageControl();
  const { fetchTTS, audioRef } = useTTS();
  const {
    userName,
    userBirth,
    userPhoneNumber,
    painArea,
    handleName,
    handleBirthFront,
    handleBirthBack,
    handlePhoneNumber,
    handleSubmit,
    handleCancel,
    handlePainArea,
    painAreas,
  } = useUserInfo(handlePageIndex);

  const renderContent = () => {
    switch (pageIndex) {
      case 1:
        return <AgreementPage handlePageIndex={handlePageIndex} />;
      case 2:
        return (
          <InfomationPage
            userName={userName}
            userBirth={userBirth}
            userPhoneNumber={userPhoneNumber}
            handleName={handleName}
            handleBirthFront={handleBirthFront}
            handleBirthBack={handleBirthBack}
            handlePhoneNumber={handlePhoneNumber}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        );
      case 3:
        return (
          <>
            <div className="relative w-full h-full flex flex-col justify-center items-center z-10 overflow-auto">
              <p className="text-center text-[30px] font-semibold select-none">
                먼저 통증 부위를 <br />
                선택해 주세요.
              </p>
              <div className="py-4 px-8 flex flex-col items-center mt-4 gap-4 bg-[rgba(229,255,223,0.3)] overflow-y-auto max-h-[50rem] mb-4">
                {painAreas.map((area, index) => (
                  <button
                    key={index}
                    value={area}
                    onClick={handlePainArea}
                    className="text-lg font-semibold w-[15rem] h-[3rem] bg-white border py-2 rounded-lg hover:bg-primary hover:text-white"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute bottom-[-8rem] left-[-4rem] w-[60%] min-w-[15rem] max-w-[30rem] h-auto">
              <img
                src="/gradient_circle.svg"
                alt="logo"
                className="w-full h-auto"
              />
            </div>
          </>
        );
      case 4:
      default:
        return (
          <InquiryChatPage
            isLoading={isLoading}
            botMessage={botMessage}
            scrollToBottom={scrollToBottom}
            audioRef={audioRef}
            messagesEndRef={messagesEndRef}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            handleSendMessageStream={handleSendMessageStream}
          />
        );
    }
  };

  React.useEffect(() => {
    console.log(
      "현재 선택된 내용 : ",
      userName,
      userBirth,
      userPhoneNumber,
      painArea
    );
  }, [pageIndex]);
  return (
    <>
      <Head>
        <title>GENTLEPIE-INQUIRY</title>
      </Head>
      <div className="w-full h-full flex justify-center bg-gray-100 overflow-hidden">
        <div className="w-full h-full flex flex-col items-between min-w-[240px] max-w-[1280px] bg-white relative">
          <Header title={"문진 챗봇"} titleStyle={""} />
          <div className="absolute top-[-4rem] right-0 w-[50%] min-w-[16rem] max-w-[26rem] h-auto">
            <img
              src="/gradient_circle.svg"
              alt="logo"
              className="w-full h-auto"
            />
          </div>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Inquiry;
