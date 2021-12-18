import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { getMusicsRequest, selectMusic } from "../../../reducers/musicSlice";

import Music from "../../Shared/Music";
import MoreBox from "./MoreBox";

const MusicBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 20px;
  margin-top: 10px;

  .link {
    width: 250px;
  }
`;

export default function MusicGrid() {
  const [page, setPage] = useState(0);
  const { musics } = useSelector(selectMusic);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page === 0) {
      return;
    }

    dispatch(getMusicsRequest(page));
  }, [page]);

  function handlePageScroll() {
    setPage((page) => page + 1);
  }

  return (
    <>
      <MusicBox>
        {musics?.map((music) => (
          <Link key={music._id} to={`/musics/${music._id}`} className="link">
            <Music key={music._id} music={music} />
          </Link>
        ))}
      </MusicBox>
      <MoreBox handlePageScroll={handlePageScroll} />
    </>
  );
}
