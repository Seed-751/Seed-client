import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 5px;
  padding-top: 0;
  width: 250px;
  height: 300px;
  border: none;

  &:hover {
    cursor: pointer;
  }

  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
  }

  strong {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-top: 0 auto;
  box-shadow: 2px 0px 10px 1px rgba(0, 0, 0, 0.3);
`;

const Status = styled.div`
  position: absolute;
  height: 30px;
  top: 220px;
  padding: 5px;
  line-height: 22px;
  background-color: ${({ theme }) => theme.color.green};
  color: white;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.5;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default function Music({ music }) {
  const { title, image: url, artist, funding } = music;
  const { name } = artist;
  const { target, amount } = funding;
  const status = (amount / target) * 100;

  return (
    <Wrapper>
      <ImgBox>
        <img src={url} alt="thumb-nail"></img>
        <Status>{status.toFixed(1)}%</Status>
      </ImgBox>
      <InfoBox>
        <span>{title}</span>
        <p>{name}</p>
      </InfoBox>
    </Wrapper>
  );
}

Music.propTypes = {
  music: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    artist: PropTypes.object,
    funding: PropTypes.object,
  }).isRequired,
};
