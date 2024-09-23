import React, { useRef, useEffect, useState } from "react";

type ChatInputProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  loading: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  loading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!loading) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  return (
    <div className="relative w-full px-4 py-2 text-base">
      <form
        onSubmit={handleSubmit}
        className="relative w-full bg-white flex border border-primary rounded-3xl mb-2 py-4"
      >
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
          placeholder="질문을 입력하세요."
          className="flex-grow px-6 text-primary bg-transparent focus:outline-none pr-20"
        />
        <button
          type="submit"
          disabled={loading}
          className="text-xs w-12 h-10 bg-primary text-white p-2 rounded-full absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          {loading ? "로딩" : "입력"}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
