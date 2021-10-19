import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import theme from "../styles/theme";
import { IconButton, Avatar } from "@material-ui/core/";
import { Forward10, Replay10, PlayCircleFilled, PauseCircleFilled, VolumeOff, VolumeUp } from "@material-ui/icons/";
import { selectCurrentMusic } from "../reducers/currentMusicSlice";

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
  color: ${({ theme }) => theme.color.green};
`;

const PlaySliderBox = styled.div`
  position: absolute;
  width: 100%;
  padding: 0;
  z-index: 1;
  top: -3px;
  left: 0;
`;

const ProgressBar = styled.input`
  margin: 0;
  z-index: 2;
  width: 100%;
  height: 3px;
  appearance: none;
  color: ${({ theme }) => theme.color.green};
  background: ${({ theme }) => theme.color.green};
  outline: none;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: none;
    background-color: ${({ theme }) => theme.color.green};
    cursor: pointer;
    position: relative;
    margin: -2px 0 0 0;
  }
`;

export default function BottomPlayer({ image }) {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const soundBar = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { currentTrack } = useSelector(selectCurrentMusic);
  const { title, artist, url: audioUrl } = currentTrack;

  useEffect(() => {
    audioPlayer.current.onloadedmetadata = function () {
      setDuration(Math.floor(audioPlayer.current.duration));
      audioPlayer.current.volume = soundBar.current.value / 100;
    };

    const id = setInterval(() => {
      if (!audioPlayer.current) {
        return null;
      }

      progressBar.current.value = audioPlayer.current.currentTime / audioPlayer.current.duration * 100;
      setCurrentTime(Math.floor(audioPlayer.current.currentTime));
    }, 100);

    return (() => {
      clearInterval(id);
    });
  }, [currentTrack]);

  function handleTogglePlay() {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }

  function handleToggleMute() {
    setIsMuted(!isMuted);

    if (!isMuted) {
      audioPlayer.current.muted = true;
    } else {
      audioPlayer.current.muted = false;
    }
  }

  function handleChangeProgress(e) {
    audioPlayer.current.currentTime = duration * e.target.value / 100;
  }

  function handleChangeSound(e) {
    audioPlayer.current.volume = e.target.value / 100;
  }

  function handleBackwardTen() {
    audioPlayer.current.currentTime -= 10;
  }

  function handleForwardTen() {
    audioPlayer.current.currentTime += 10;
  }

  return (
    <Wrapper>
      <audio ref={audioPlayer} src={audioUrl} preload="metadata" />
      <PlaySliderBox>
        <ProgressBar
          ref={progressBar}
          type="range"
          defaultValue={0}
          onChange={handleChangeProgress}
        />
      </PlaySliderBox>
      <MusicInfoBox>
        <Avatar variant="square" src={image} />
        <MusicDetail>
          <p>{title}</p>
          <p>{artist}</p>
        </MusicDetail>
      </MusicInfoBox>
      <ButtonBox>
        <IconButton>
          <Replay10
            style={{ color: theme.color.lightGray }}
            onClick={handleBackwardTen}
          />
        </IconButton>
        <IconButton onClick={handleTogglePlay}>
          {isPlaying
            ? <PauseCircleFilled style={{ color: theme.color.green }} />
            : <PlayCircleFilled style={{ color: theme.color.green }} />
          }
        </IconButton>
        <IconButton>
          <Forward10
            style={{ color: theme.color.lightGray }}
            onClick={handleForwardTen}
          />
        </IconButton>
      </ButtonBox>
      <TimeSoundInfoBox>
        <p>{currentTime} / {duration}</p>
        <SoundBox>
          <ProgressBar
            ref={soundBar}
            type="range"
            style={{ color: theme.color.green }}
            onChange={handleChangeSound}
          />
        </SoundBox>
        <IconButton onClick={handleToggleMute}>
          {!isMuted
            ? <VolumeUp style={{ color: theme.color.lightGray }} />
            : <VolumeOff style={{ color: theme.color.lightGray }} />
          }
        </IconButton>
      </TimeSoundInfoBox>
    </Wrapper>
  );
}

BottomPlayer.propTypes = {
  image: PropTypes.string,
};
