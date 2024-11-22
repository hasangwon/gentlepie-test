import "@/styles/globals.css";
import "@/styles/reset.css";
import "@/styles/animation.css";
import "@/styles/responsive.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
