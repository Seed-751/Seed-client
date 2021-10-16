import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { IconButton } from "@material-ui/core/";
import { PlayCircleFilled } from "@material-ui/icons/";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  h1 {
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

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 40%;
  }
`;

export default function PlayList({ musics, onClick }) {
  return (
    <Wrapper>
      <h1>tracks</h1>
      {musics?.map((music) => {
        const { title, track, _id } = music;
        const currentTrack = track.split("/")[0];
        return (
          <TrackBox key={_id}>
            <p>{currentTrack}</p>
            <div className="title">
              <p>{title}</p>
            </div>
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
