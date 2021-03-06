import React from "react";
import styled from "styled-components";

import MusicGrid from "../components/Pages/Dashboard/MusicGrid";

const Wrapper = styled.div`
  width: 100%;
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
      <MusicGrid />
    </Wrapper>
  );
}
