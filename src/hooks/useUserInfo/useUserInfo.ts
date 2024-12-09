import { painAreaState } from "@/store/painAreaState";
import { painAreas } from "@/utils/constants";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";

export const useUserInfo = (handlePageIndex: (index: number) => void) => {
  const [userName, setUserName] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [painArea, setPainArea] = useRecoilState(painAreaState);
  const backRef = useRef<HTMLInputElement>(null);

  const initUserInfo = () => {
    setUserName("");
    setUserBirth("");
    setUserPhoneNumber("");
    setPainArea("");
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setUserName(e.target.value);
    }
  };

  const handleBirthFront = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    setUserBirth(input.slice(0, 6));
    if (backRef && backRef.current && input.length === 6) {
      backRef.current.focus();
    }
  };

  const handleBirthBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    setUserBirth((prev) => prev.slice(0, 6) + input.slice(0, 7));
  };

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    let formattedInput = input;

    if (input.length > 3 && input.length <= 7) {
      formattedInput = input.slice(0, 3) + "-" + input.slice(3);
    } else if (input.length > 7) {
      formattedInput = input.slice(0, 3) + "-" + input.slice(3, 7) + "-" + input.slice(7, 11);
    }
    if (formattedInput.length <= 13) {
      setUserPhoneNumber(formattedInput);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (userName === "" || userBirth === "" || userPhoneNumber === "") {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    if (userBirth.length < 6) {
      alert("생년월일은 최소 6자리 이상 입력해주세요.");
      return;
    }
    if (userPhoneNumber.length < 10) {
      alert("전화번호는 최소 10자리 이상 입력해주세요.");
      return;
    }
    handlePageIndex(3);
  };

  const handleCancel = () => {
    handlePageIndex(1);
    initUserInfo();
  };

  const handlePainArea = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPainArea(e.currentTarget.value);
    handlePageIndex(4);
  };

  return {
    userName,
    userBirth,
    userPhoneNumber,
    painArea,
    handleName,
    handleBirthFront,
    handleBirthBack,
    handlePhoneNumber,
    initUserInfo,
    handleSubmit,
    handleCancel,
    handlePainArea,
    painAreas,
    backRef,
  };
};

export default useUserInfo;
