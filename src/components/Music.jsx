import React from "react";
import styled from "styled-components";

import { INITIAL_PREVIEW_IMAGE } from "../constants";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 250px;
  border: none;
  background: #fff;
  border-radius: 10px;
  box-shadow: 9px 7px 27px -6px rgba(0,0,0,0.75);

  &:hover {
    cursor: pointer;
  }

  img {
    width: 100%;
  }

  strong {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
  }
`;

const ImgBox = styled.div`
  width: 90%;
  border-radius: 10px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
`;

export default function Music() {

  return (
    <Wrapper>
      <ImgBox>
        <img src={INITIAL_PREVIEW_IMAGE} alt="thumb-nail"></img>
      </ImgBox>
      <InfoBox>
        <h1>title</h1>
        <p>artist</p>
      </InfoBox>
    </Wrapper>
  );
}
