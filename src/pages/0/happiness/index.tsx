import React from "react";
import Head from "next/head";
import useInquiry from "@/hooks/useInquiry";
import useInquiryPageControl from "@/hooks/useInquiryPageControl";
import useTTS from "@/hooks/useTTS";
import useModal from "@/hooks/useModal";
import useUserInfo from "@/hooks/useUserInfo";
import { chatbotName } from "@/utils/constants";
import Header from "@/components/layout/Default/Header";
import BackgroundImage from "@/components/layout/Default/BackgroundImage";
import InquiryEndModal from "@/components/layout/Modal/InquiryEndModal";
import AgreementPage from "@/components/layout/AgreementPage/AgreementPage";
import InfomationPage from "@/components/layout/InformationPage/InfomationPage";
import PainAreaPage from "@/components/layout/PainAreaPage/PainAreaPage";
import EndPage from "@/components/layout/EndPage/EndPage";
import InquiryChatPage from "@/components/layout/Main/InquiryChatPage";

const Index: React.FC = () => {
  const { fetchTTS, audioRef, isTTSloading } = useTTS();
  const {
    inputValue,
    setInputValue,
    userMessages,
    setUserMessages,
    botMessage,
    isLoading,
    handleSendMessageStream,
    threadId,
    setThreadId,
  } = useInquiry();
  const { pageIndex, messagesEndRef, scrollToBottom, handlePageIndex } =
    useInquiryPageControl();
  const { isModalOpen, handleModal } = useModal();
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
    initUserInfo,
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
          <PainAreaPage
            painAreas={painAreas}
            handlePainArea={(e) => {
              handlePainArea(e);
              fetchTTS(botMessage);
            }}
          />
        );
      case 4:
        return (
          <InquiryChatPage
            isLoading={isLoading}
            botMessage={botMessage}
            scrollToBottom={scrollToBottom}
            audioRef={audioRef}
            messagesEndRef={messagesEndRef}
            inputValue={inputValue}
            setInputValue={setInputValue}
            fetchTTS={fetchTTS}
            handleSendMessageStream={handleSendMessageStream}
            handleEndModal={handleModal}
            userMessages={userMessages}
            isTTSloading={isTTSloading}
          />
        );
      case 5:
        return <EndPage />;
      default:
        return <div></div>;
    }
  };

  // 완료 함수
  const onEndInquiry = () => {
    initUserInfo();
    setThreadId("");
    handleModal(false);
    setUserMessages([]);
    handlePageIndex(5);
    console.log("threadID로 문진 완료 API 전송", threadId);
  };

  return (
    <>
      <Head>
        <title>{chatbotName}</title>
      </Head>
      <div className="w-full h-full flex justify-center bg-white overflow-y-auto overflow-x-hidden">
        <div className="w-full h-full flex flex-col items-between min-w-[320px] min-h-[480px] bg-white relative">
          {isModalOpen && pageIndex > 2 && (
            <InquiryEndModal
              handleModal={handleModal}
              onNextClick={onEndInquiry}
            />
          )}
          <Header handleEndModal={handleModal} pageIndex={pageIndex} />
          {pageIndex < 4 && <BackgroundImage />}
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Index;
