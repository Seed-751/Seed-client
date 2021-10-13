import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { IconButton } from "@material-ui/core/";
import { PlayCircleFilled } from "@material-ui/icons/";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TrackBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  border: 1px solid black;
  line-height: 60px;
`;

export default function PlayList({ musics, onClick }) {
  return (
    <Wrapper>
      {musics?.map((music) => {
        const { title, artist, track, _id } = music;
        const currentTrack = track.split("/")[0];
        return (
          <TrackBox key={_id}>&nbsp;
            <p>{currentTrack}</p>&nbsp;
            <p>{title}</p> -
            <p>{artist}</p>
            <IconButton onClick={() => onClick(music)}>
              <PlayCircleFilled />
            </IconButton>
          </TrackBox>
        );
      })}
    </Wrapper>
  );
}

PlayList.propTypes = {
  musics: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
