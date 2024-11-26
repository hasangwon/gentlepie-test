import React from "react";
import ButtonArea from "../../common/atom/ButtonArea";
import ContentContainer, { Content } from "../../common/atom/ContentContainer";
import AgreeRuleModal from "../Modal/AgreeRuleModal";

const AgreementPage = ({
  handlePageIndex,
}: {
  handlePageIndex: (index: number) => void;
}) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [info, setInfo] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState("agreement");

  React.useEffect(() => {
    fetch("/privacy-policy.json")
      .then((res) => res.json())
      .then((data) => setInfo(data.content))
      .catch((error) => console.error("Failed to load policy:", error));
  }, []);

  const openingText =
    "안녕하세요.\n행복한 H 문진 챗봇입니다.\n\n개인정보 동의 후\n질문과 문진을\n시작하겠습니다.";
  const disareeText =
    "개인정보 수집 및 활용에\n동의하지 않으시면\n\n서비스 이용이\n제한될 수 있습니다.\n\n동의 후 다시 시도해주세요.";

  return (
    <ContentContainer>
      <Content title={currentPage === "agreement" ? openingText : disareeText}>
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
