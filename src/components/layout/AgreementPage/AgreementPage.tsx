import React from "react";
import ButtonArea from "../../common/atom/ButtonArea";
import ContentContainer, { Content } from "../../common/atom/ContentContainer";
import AgreeRuleModal from "../Modal/AgreeRuleModal";
import {
  AgreementDisareeText,
  AgreementOpeningText,
  BASE_PATH,
} from "@/utils/constants";

const AgreementPage = ({
  handlePageIndex,
}: {
  handlePageIndex: (index: number) => void;
}) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [info, setInfo] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState("agreement");

  React.useEffect(() => {
    fetch(`${BASE_PATH}/privacy-policy.json`)
      .then((res) => res.json())
      .then((data) => setInfo(data.content))
      .catch((error) => console.error("Failed to load policy:", error));
  }, []);
  return (
    <ContentContainer>
      <Content
        title={
          currentPage === "agreement"
            ? AgreementOpeningText
            : AgreementDisareeText
        }
      >
        {isOpenModal && (
          <AgreeRuleModal handleModal={setIsOpenModal} info={info} />
        )}
        {currentPage === "agreement" && (
          <button
            onClick={() => {
              setIsOpenModal(true);
            }}
            className="text-[14px] underline mt-[2rem] font-light"
          >
            개인정보 수집 및 활용 동의서
          </button>
        )}
      </Content>
      {currentPage === "agreement" ? (
        <ButtonArea
          onCancel={() => setCurrentPage("disagree")}
          onSubmit={() => handlePageIndex(2)}
          cancelButtonText={"동의하지 않음"}
          nextButtonText={"동의하고 시작하기"}
        />
      ) : (
        <ButtonArea
          onSubmit={() => setCurrentPage("agreement")}
          nextButtonText={"처음으로"}
        />
      )}
    </ContentContainer>
  );
};

export default AgreementPage;
