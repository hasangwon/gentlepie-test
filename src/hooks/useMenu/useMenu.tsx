import { useState } from "react";

const useInput = () => {
  const [menu, setMenu] = useState<"FAQ" | "Chat">("FAQ");
  return {
    menu,
    setMenu,
  };
};

export default useInput;
