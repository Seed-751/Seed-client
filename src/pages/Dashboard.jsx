import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import requestMusics from "../api/requestMusics";
import { occurError } from "../reducers/errorSlice";

import Music from "../components/Music";
import MoreBox from "../components/MoreBox";

const Container = styled.div`
  height: 100%;
  padding: 10px;

  .title {
    font-size: 50px;
  }
`;

const MusicBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 20px;
  margin-top: 10px;

  .link {
    width: 250px;
  }
`;

export default function Dashboard() {
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page === 0) {
      return null;
    }

    async function getMusics() {
      try {
        const { data, message } = await requestMusics(page);

        if (data) {
          return setList((list) => [...list, ...data]);
        }

        dispatch(occurError(message));
      } catch (err) {
        dispatch(occurError(err.message));
      }
    }

    getMusics();
  }, [page]);

  function handlePageScroll() {
    setPage((page) => page + 1);
  }

  return (
    <>
      <Container>
        <h1 className="title">Albums</h1>
        <MusicBox>
          {list?.map((music) => (
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
      <MoreBox handlePageScroll={handlePageScroll} />
    </>
  );
}
