import React from "react";
import ContentContainer, { Content } from "../../common/atom/ContentContainer";
import ButtonArea from "../../common/atom/ButtonArea";

const EndPage = ({
  handlePageIndex,
}: {
  handlePageIndex: (index: number) => void;
}) => {
  const title = "감사합니다.\n문진이 완료되었습니다.";
  const description = "입력한 내용은\n원장님께 전달됩니다.";

  return (
    <ContentContainer>
      <Content title={title} className="h-[20rem]">
        <p className="mt-10 leading-7">{description}</p>
      </Content>
      <ButtonArea
        onSubmit={() => window.location.reload()}
        nextButtonText={"처음으로"}
      />
    </ContentContainer>
  );
};

export default EndPage;
