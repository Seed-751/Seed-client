import React from "react";
import styled from "styled-components";

import theme from "../styles/theme";
import { IconButton, Slider, Avatar } from "@material-ui/core/";
import { Forward10, Replay10, PlayArrow, Pause, VolumeOff, VolumeUp } from "@material-ui/icons/";
import { INITIAL_PREVIEW_IMAGE, DEFAULT_AUDIO_SAMPLE } from "../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.white};
  height: 60px;
  font: 5px;
  color: ${({ theme }) => theme.color.lightGray};

  div {
    display: flex;
  }
`;

const PlaySliderBox = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1;
  top: -14px;
  left: 0;
  color: ${({ theme }) => theme.color.blue};
`;

const MusicInfoBox = styled.div`
  justify-content: flex-start;
  padding: 10px;
  width: 30%;
  gap: 20px;
`;

const MusicDetail = styled.div`
  flex-direction: column;
  justify-content: center;
  color: black;
`;

const ButtonBox = styled.div`
  align-items: center;
  justify-content: center;
  width: 30%;
`;

const TimeSoundInfoBox = styled.div`
  align-items: center;
  justify-content: end;
  gap: 30px;
  width: 30%;
`;

const SoundBox = styled.div`
  width: 100px;
`;

export default function BottomPlayer() {

  return (
    <Wrapper>
      <PlaySliderBox>
        <Slider style={{ color: theme.color.blue }}></Slider>
      </PlaySliderBox>
      <MusicInfoBox>
        <Avatar variant="square" src={INITIAL_PREVIEW_IMAGE} />
        <MusicDetail>
          <p>title</p>
          <p>artist</p>
        </MusicDetail>
      </MusicInfoBox>
      <ButtonBox>
        <IconButton>
          <Replay10 style={{ color: theme.color.blue }} />
        </IconButton>
        <audio src={DEFAULT_AUDIO_SAMPLE}/>
        <IconButton>
          <PlayArrow style={{ color: theme.color.blue }} />
          <Pause style={{ color: theme.color.blue }} />
        </IconButton>
        <IconButton>
          <Forward10 style={{ color: theme.color.blue }} />
        </IconButton>
      </ButtonBox>
      <TimeSoundInfoBox>
        <p>time / duration</p>
        <SoundBox>
          <Slider style={{ color: theme.color.blue }} />
        </SoundBox>
        <IconButton>
          <VolumeUp style={{ color: theme.color.blue }} />
          <VolumeOff style={{ color: theme.color.blue }} />
        </IconButton>
      </TimeSoundInfoBox>
    </Wrapper>
  );
}
