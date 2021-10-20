import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

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

export default function SearchPreview({ onReset }) {
  const { searchResult } = useSelector(selectSearch);
  const history = useHistory();

  function handleClickPreview(musicId) {
    history.push(`/musics/${musicId}`);
    onReset();
  }

  return (
    <Wrapper>
      {searchResult?.map((music) => (
        <div key={music._id} className="link" onClick={() => handleClickPreview(music._id)} >
          <Avatar variant="square" src={music.image}/>
          <p>{music.artist.name}</p>
          <p>{music.title}</p>
        </div>
      ))}
    </Wrapper>
  );
}

SearchPreview.propTypes = {
  onReset: PropTypes.func.isRequired,
};
