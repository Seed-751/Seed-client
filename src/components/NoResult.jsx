import React from "react";
import styled from "styled-components";
import { SmsFailed } from "@material-ui/icons/";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10%;
  height: 500px;

  strong {
    color: ${({ theme }) => theme.color.gray};
    font-size: 40px;
  }

  p {
    color: ${({ theme }) => theme.color.gray};
    font-size: 30px;
  }

  .icon {
    color: ${({ theme }) => theme.color.green};
    font-size: 300px;
  }
`;

export default function NoResult() {
  return (
    <Wrapper>
      <SmsFailed className="icon" />
      <strong>검색 결과를 찾지 못했습니다</strong>
      <p>다시 시도해주세요</p>
    </Wrapper>
  );
}
