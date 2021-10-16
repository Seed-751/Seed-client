import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { selectMusic, getMusicsRequest } from "../reducers/musicSlice";

import Music from "../components/Music";

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

export default function Dashboard() {
  const { musics, isLoading } = useSelector(selectMusic);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMusicsRequest());

  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  return (
    <Container>
      <h1>Musics</h1>
      <MusicBox>
        {musics?.map((music) => (
          <Link
            key={music._id}
            to={`/musics/${music._id}`}
            className="link"
          >
            <Music key={music._id} music={music} />
          </Link>
        ))}
      </MusicBox>
    </Container>
  );
}
