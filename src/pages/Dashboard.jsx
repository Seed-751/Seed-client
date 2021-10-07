import React from "react";
import styled from "styled-components";

import Music from "../components/Music";

const Container = styled.div`
  padding: 20px;
`;

const MusicBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 20px;
	column-gap: 20px;
  margin-top: 10px;
`;

export default function Dashboard() {

  return (
    <Container>
      <h1>Musics</h1>
      <MusicBox>
        <Music />
      </MusicBox>
    </Container>
  );
}
