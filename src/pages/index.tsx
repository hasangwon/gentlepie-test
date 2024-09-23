import React from "react";
import Head from "next/head";
import Link from "next/link";

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <title>GENTLEPIE-TEST</title>
      </Head>
      <div className="w-full h-full flex justify-center bg-gray-100">
        <div className="w-full h-full flex flex-col items-center min-w-[320px] max-w-[720px] bg-white">
          <header className="text-2xl py-4 bg-yellow-500 w-full text-center text-white">
            젠틀파이 테스트 웹
          </header>
          <ul className="w-full text-left flex flex-col gap-1">
            <Link
              className="text-lg font-semibold hover:bg-yellow-300 py-4 px-2"
              href={"/stt"}
            >
              ◈ 음성 인식(STT) 테스트
            </Link>
            <Link
              className="text-lg font-semibold hover:bg-yellow-300 py-4 px-2"
              href={"/chat"}
            >
              ◈ 기본 채팅 테스트
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Index;
