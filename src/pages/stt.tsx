import React from "react";

import useChat from "@/hooks/useSTTChat/useChat";
import Head from "next/head";
import STTInput from "@/components/layout/STTLayout/STTInput";
import STTHeader from "@/components/layout/STTLayout/STTHeader";

const STT: React.FC = () => {
  const { inputValue, setInputValue } = useChat();

  return (
    <>
      <Head>
        <title>STT-TEST</title>
      </Head>
      <div className="w-full h-full flex justify-center bg-gray-100">
        <div className="w-full h-full flex flex-col justify-between min-w-[320px] max-w-[720px] bg-white">
          <STTHeader />
          <div className="border m-8 p-4 h-[30rem] bg-gray-100 rounded-xl">
            {inputValue}
          </div>
          <STTInput inputValue={inputValue} setInputValue={setInputValue} />
        </div>
      </div>
    </>
  );
};

export default STT;
