import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import Music from "../../Shared/Music";

const Container = styled.div`
  padding: 20px;
`;

const MusicBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 20px;
  column-gap: 20px;
  margin-top: 10px;

  .link {
    width: 250px;
  }
`;

export default function MyFundings({ myFundings }) {
  return (
    <Container>
      <strong>My Fundings</strong>
      <MusicBox>
        {myFundings?.map((music) => (
          <Link key={music._id} to={`/musics/${music._id}`} className="link">
            <Music key={music._id} music={music} />
          </Link>
        ))}
      </MusicBox>
    </Container>
  );
}

MyFundings.propTypes = {
  myFundings: PropTypes.array,
};
