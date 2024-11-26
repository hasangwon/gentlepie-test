import React from "react";

const AgreeRuleModal = ({
  handleModal,
  info,
}: {
  handleModal: React.Dispatch<React.SetStateAction<boolean>>;
  info: string;
}) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => handleModal(false)}
      />
      <div className="w-[80%] p-4 flex flex-col justify-between bg-white rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <button
          className="absolute top-4 right-4"
          onClick={() => handleModal(false)}
        >
          ✕
        </button>
        <div className="">
          <h5 className="text-left text-xl font-semibold">개인정보취급방침</h5>
          <p className="mt-4 whitespace-pre-wrap h-[20rem] overflow-y-auto border p-2 rounded-xl text-sm font-normal text-left">
            {info}
          </p>
        </div>
      </div>
    </>
  );
};

export default AgreeRuleModal;
