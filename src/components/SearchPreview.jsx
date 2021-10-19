import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { selectSearch } from "../reducers/searchSlice";
import { Avatar } from "@material-ui/core/";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: 1px solid red;
    background-color: white;
    height: 50px;
    z-index: 1;
  }
`;

export default function SearchPreview() {
  const { searchResult } = useSelector(selectSearch);

  return (
    <Wrapper>
      {searchResult?.map((music) => (
        <Link key={music._id} className="link" to={`/musics/${music._id}`}>
          <Avatar variant="square" src={music.image}/>
          <p>{music.artist.name}</p>
          <p>{music.title}</p>
        </Link>
      ))}
    </Wrapper>
  );
}
