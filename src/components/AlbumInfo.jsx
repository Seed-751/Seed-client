import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "../components/shared/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 400px;
  margin-bottom: 10px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-shrink: 0;
  width: 50%;
  height: 400px;
  line-height: 2rem;

  button {
    width: 100px;
  }

  strong {
    font-weight: bold;
    font-size: 90px;
  }

  .artist {
    font-size: 30px;
    color: ${({ theme }) => theme.color.green};
  }

  .genre {
    font-size: 20px;
    color: ${({ theme }) => theme.color.lightGray};
  }

  .description {
    position: relative;
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
  }
`;

const FundingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.color.lightGray};

  strong {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: white;
  }

  button {
    align-self: center;
    width: 50%;
  }
`;

export default function AlbumInfo({ album, onClick }) {
  const {
    title,
    artist,
    description,
    genre,
    image,
    funding,
  } = album;
  const { name } = artist;
  const { target, donors, amount } = funding;

  return (
    <Wrapper>
      <ImgBox>
        <img src={image} />
      </ImgBox>
      <InfoBox>
        <strong className="title">{title}</strong>
        <p className="artist">{name}</p>
        <p className="genre">{genre}</p>
        <p className="description">{description}</p>
      </InfoBox>
      <FundingBox>
        <strong className="title">Funding status</strong>
        <p>target {target} 원</p>
        <p>후원자 {donors ? donors.length : 0} 명</p>
        <p>모인금액 {amount} 원</p>
        <Button onClick={onClick}>후원</Button>
      </FundingBox>
    </Wrapper>
  );
}

AlbumInfo.propTypes = {
  album: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
