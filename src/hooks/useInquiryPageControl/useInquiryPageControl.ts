import { useRef, useState } from "react";

const useInquiryPageControl = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handlePageIndex = (index: number) => {
    setPageIndex(index);
  };

  return {
    pageIndex,
    messagesEndRef,
    scrollToBottom,
    handlePageIndex
  };
};

export default useInquiryPageControl;
