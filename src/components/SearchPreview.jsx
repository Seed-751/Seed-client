import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import { selectSearchPreview } from "../reducers/searchPreviewSlice";
import { Avatar } from "@material-ui/core/";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  margin-top: 5px;
  width: 100%;
  background-color: white;
  border-radius: 15px;
  z-index: 1;
  color: ${({ theme }) => theme.color.lightGray};
`;

const PreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px;
  width: 100%;
  border: 1px solid gray;
  border-radius: 15px;

  .link {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
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

export default function SearchPreview({ onReset, searchInput }) {
  const { searchPreviewResult } = useSelector(selectSearchPreview);
  const { albumsByTitle, albumsByArtist } = searchPreviewResult;
  const history = useHistory();

  function handleClickPreview(musicId) {
    history.push(`/musics/${musicId}`);
    onReset();
  }

  return (
    <>
      {searchInput &&
        <Wrapper>
          <PreviewBox>
            <h1>Title</h1>
            {albumsByTitle?.length
              ?
              (albumsByTitle?.map((music) => (
                <div key={music._id} className="link" onClick={() => handleClickPreview(music._id)} >
                  <Avatar className="avatar" variant="square" src={music.image} />
                  <p className="artist">{music.artist.name}</p>
                  <p className="title">{music.title}</p>
                </div>
              )))
              :
              <p>결과를 찾을수 없습니다</p>
            }
          </PreviewBox>
          <PreviewBox>
            <h1>Artist</h1>
            {albumsByArtist?.length
              ?
              (albumsByArtist?.map((music) => (
                <div key={music._id} className="link" onClick={() => handleClickPreview(music._id)} >
                  <Avatar className="avatar" variant="square" src={music.image} />
                  <p className="artist">{music.artist.name}</p>
                  <p className="title">{music.title}</p>
                </div>
              )))
              :
              <p>결과를 찾을수 없습니다</p>
            }
          </PreviewBox>
        </Wrapper>}
    </>
  );
}

SearchPreview.propTypes = {
  onReset: PropTypes.func.isRequired,
  searchInput: PropTypes.node,
};
