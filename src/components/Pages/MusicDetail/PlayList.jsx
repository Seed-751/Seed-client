import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { IconButton } from "@material-ui/core/";
import { PlayArrow } from "@material-ui/icons/";
import { setCurrentTrack } from "../../../reducers/currentMusicSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  strong {
    font-size: 25px;
  }
`;

const TrackBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
  line-height: 60px;
  color: ${({ theme }) => theme.color.lightGray};

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 40%;
  }

  .icon {
    color: white;
    font-size: 30px;
  }
`;

export default function PlayList({ musics }) {
  const dispatch = useDispatch();

  function handleSetCurrentTrack(music) {
    dispatch(setCurrentTrack(music));
  }

  return (
    <Wrapper>
      <strong>Tracks</strong>
      {musics?.map((music) => {
        const { title, track, _id } = music;
        const currentTrack = track.split("/")[0];
        return (
          <TrackBox key={_id}>
            <p>{currentTrack}</p>
            <div className="title">
              <p>{title}</p>
            </div>
            <IconButton onClick={() => handleSetCurrentTrack(music)}>
              <PlayArrow className="icon" />
            </IconButton>
          </TrackBox>
        );
      })}
    </Wrapper>
  );
}

PlayList.propTypes = {
  musics: PropTypes.array.isRequired,
};
