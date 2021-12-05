import React from "react";
import styled from "styled-components";

import requestMusics from "../api/requestMusics";

import MusicGrid from "../components/MusicGrid";

const Wrapper = styled.div`
  height: 100%;
  margin-top: 10px;
  padding: 10px;

  .title {
    font-size: 50px;
  }
`;

export default function Dashboard() {
  return (
    <Wrapper>
      <h1 className="title">Albums</h1>
      <MusicGrid apiMethod={requestMusics} />
    </Wrapper>
  );
}
