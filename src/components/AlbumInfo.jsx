import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "../components/shared/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 400px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin-left: 15px;
  width: 900px;
  height: 400px;
  line-height: 2rem;

  button {
    width: 100px;
  }

  .title {
    font-weight: bold;
    font-size: 40px;
    flex: 1;
  }

  .artist {
    font-size: 30px;
    flex: 0.5;
    color: ${({ theme }) => theme.color.blue};

  }

  .genre {
    font-size: 20px;
    color: ${({ theme }) => theme.color.lightGray};
    flex: 0.5;
  }

  .description {
    position: relative;
    flex: 3;
    line-height: 2rem;
  }
`;

const ImgBox = styled.div`
  flex-shrink: 0;
  width: 300px;
  height: 300px;

  img {
    height: inherit;
    object-fit: contain;
    border-radius: 5px;
  }
`;

export default function AlbumInfo({ album, onClick }) {
  const {
    title,
    artist,
    description,
    genre,
    image,
  } = album;

  return (
    <Wrapper>
      <ImgBox>
        <img src={image} />
      </ImgBox>
      <InfoBox>
        <p className="title">{title}</p>
        <p className="artist">{artist}</p>
        <p className="genre">{genre}</p>
        <p className="description">{description}</p>
        <Button onClick={onClick}>후원</Button>
      </InfoBox>
    </Wrapper>
  );
}

AlbumInfo.propTypes = {
  album: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
