import React from "react";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useInquiry from "@/hooks/useInquiry";
import useInquiryPageControl from "@/hooks/useInquiryPageControl";
import useTTS from "@/hooks/useTTS";
import useUserInfo from "@/hooks/useUserInfo";
import Header from "@/components/layout/Default/Header";
import BackgroundImage from "@/components/layout/Default/BackgroundImage";
import InquiryEndModal from "@/components/layout/Modal/InquiryEndModal";
import AgreementPage from "@/components/layout/AgreementPage/AgreementPage";
import InfomationPage from "@/components/layout/InformationPage/InfomationPage";
import PainAreaPage from "@/components/layout/PainAreaPage/PainAreaPage";
import InquiryChatPage from "@/components/layout/InquiryChatPAge/InquiryChatPage";
import EndPage from "@/components/layout/EndPage/EndPage";

const Index: React.FC = () => {
  const {
    inputValue,
    setInputValue,
    userMessages,
    setUserMessages,
    botMessage,
    isLoading,
    handleSendMessage,
    handleSendMessageStream,
    threadId,
    setThreadId,
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
            handleEndModal={handleEndModal}
            userMessages={userMessages}
          />
        );
      case 5:
        return <EndPage handlePageIndex={handlePageIndex} />;
    }
  };

  React.useEffect(() => {
    console.log(
      "현재 선택된 내용 : ",
      `{userName} : ${userName}`,
      `{userBirth} : ${userBirth}`,
      `{userPhoneNumber} : ${userPhoneNumber}`,
      `{painArea} : ${painArea}`,
      `{threadId} : ${threadId}`
    );
  }, [pageIndex]);

  const [isEndModalOpen, setIsEndModalOpen] = React.useState(false);

  const handleEndModal = (isOpen: boolean) => {
    setIsEndModalOpen(isOpen);
  };

  const onEndInquiry = () => {
    console.log(
      "문진 종료 : ",
      `{userName} : ${userName}`,
      `{userBirth} : ${userBirth}`,
      `{userPhoneNumber} : ${userPhoneNumber}`,
      `{painArea} : ${painArea}`,
      `{threadId} : ${threadId}`
    );
    initUserInfo();
    setThreadId("");
    setIsEndModalOpen(false);
    setUserMessages([]);
    handlePageIndex(5);
  };

  return (
    <>
      <Head>
        <title>GENTLEPIE-INQUIRY</title>
      </Head>
      {/* <ToastContainer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      /> */}
      <div className="w-full h-full flex justify-center bg-gray-100 overflow-hidden">
        <div className="w-full h-full flex flex-col items-between min-w-[320px] min-h-[480px] bg-white relative">
          {isEndModalOpen && pageIndex > 2 && (
            <InquiryEndModal
              handleModal={handleEndModal}
              onNextClick={onEndInquiry}
            />
          )}
          <Header
            title={"행복한 H 문진 챗봇"}
            handleEndModal={handleEndModal}
            pageIndex={pageIndex}
          />
          <BackgroundImage />
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Index;
