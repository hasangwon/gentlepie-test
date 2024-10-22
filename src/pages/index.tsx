import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import { auth } from "../../firebase";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const email = process.env.NEXT_PUBLIC_FIREBASE_TEST_EMAIL || ""; // Firebase Auth에 등록된 이메일
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (err) {
      alert("비밀번호가 틀렸습니다.");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다.", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>GENTLEPIE-TEST</title>
      </Head>
      <div className="w-full h-full flex justify-center bg-gentle-light text-gentle-text">
        {isAuthenticated ? (
          <div className="w-full h-full flex flex-col items-between min-w-[320px] max-w-[720px] bg-white">
            <div className="w-full h-full flex flex-col items-center bg-white">
              <header className="text-2xl py-4 bg-gentle w-full text-center text-white font-semibold border-b mb-4">
                Gentlepie Test Web
              </header>
              <ul className="w-full text-left flex flex-col gap-4">
                <Link
                  className="text-lg font-semibold hover:bg-gentle py-4 px-2"
                  href={"/inquiry"}
                >
                  - 문진 챗봇 테스트
                </Link>
                <Link
                  className="text-lg font-semibold hover:bg-gentle py-4 px-2"
                  href={"/stt"}
                >
                  - 음성 인식(STT) 테스트
                </Link>
                <Link
                  className="text-lg font-semibold hover:bg-gentle py-4 px-2"
                  href={"/chat"}
                >
                  - 기본 채팅 테스트
                </Link>
              </ul>
            </div>
            <button
              className="bg-gentle-light text-gentle-dark py-2 px-4 mt-4"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center flex-col">
            <b className="mb-4 text-2xl">젠틀파이 테스트 웹</b>
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="border rounded-lg px-4 py-2 focus:outline-none"
              />
              <button
                className="mt-4 px-4 py-2 bg-white border rounded-lg"
                type="submit"
              >
                로그인
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
