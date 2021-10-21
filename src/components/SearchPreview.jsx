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
  border-radius: 15px;
  width: 100%;
  background-color: white;
  z-index: 1;

  .link {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    color: ${({ theme }) => theme.color.lightGray};
    cursor: pointer;
    gap: 25px;
    padding-left: 10px;
  }

  .artist {
    flex: 1;
  }

  .title {
    flex: 2;
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
          <Avatar className="avatar" variant="square" src={music.image} />
          <p className="artist">{music.artist.name}</p>
          <p className="title">{music.title}</p>
        </div>
      ))}
    </Wrapper>
  );
}

SearchPreview.propTypes = {
  onReset: PropTypes.func.isRequired,
};
