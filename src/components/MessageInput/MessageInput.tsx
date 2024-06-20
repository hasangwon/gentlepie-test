import React, { useRef, useEffect } from "react";

type MessageInputProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  loading: boolean;
};

const MessageInput: React.FC<MessageInputProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  loading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 처음 렌더링될 때 포커스 설정
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 로딩이 끝난 후 포커스 설정
  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!loading) {
      handleSendMessage();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-4 bg-white border-t border-gray-200 flex"
    >
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={loading}
        className="flex-grow border border-gray-300 p-2 rounded-l-md"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded-r-md"
      >
        {loading ? "Loading..." : "Send"}
      </button>
    </form>
  );
};

export default MessageInput;
