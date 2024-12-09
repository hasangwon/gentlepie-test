import React from "react";
import ContentContainer, { Content } from "../../common/atom/ContentContainer";
import ButtonArea from "../../common/atom/ButtonArea";
import { EndDescription, EndTitle } from "@/utils/constants";

const EndPage = () => {
  return (
    <ContentContainer>
      <Content title={EndTitle} className="h-[20rem]">
        <p className="mt-10 leading-7">{EndDescription}</p>
      </Content>
      <ButtonArea
        onSubmit={() => window.location.reload()}
        nextButtonText={"처음으로"}
      />
    </ContentContainer>
  );
};

export default EndPage;
