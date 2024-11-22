/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";
import AgreementPage from "@/components/layout/AgreementPage";
import InfomationPage from "@/components/layout/InfomationPage";
import InquiryChatPage from "@/components/layout/InquiryChatPage";

import useInquiry from "@/hooks/useInquiry";
import useInquiryPageControl from "@/hooks/useInquiryPageControl";
import useTTS from "@/hooks/useTTS";
import useUserInfo from "@/hooks/useUserInfo";
import PainAreaPage from "@/components/layout/PainAreaPage";

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
    backRef,
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
            backRef={backRef}
          />
        );
      case 3:
        return (
          <PainAreaPage painAreas={painAreas} handlePainArea={handlePainArea} />
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
        <div className="w-full h-full flex flex-col items-between min-w-[320px] min-h-[480px] bg-white relative">
          <Header title={"행복한 H 문진 챗봇"} />
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
