import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = (open: boolean) => {
    setIsModalOpen(open);
  };

  return {
    isModalOpen,
    handleModal
  };
};

export default useModal;
