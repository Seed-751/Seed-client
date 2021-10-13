import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Modal from "../components/Modal/Modal";
import BottomPlayer from "../components/BottomPlayer";
import AlbumInfo from "../components/AlbumInfo";
import PlayList from "../components/PlayList";
import PaymentForm from "../components/Modal/PaymentForm";

import requestMusic from "../api/requestMuic";
import { selectUser } from "../reducers/userSlice";
import { occurError } from "../reducers/errorSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3%;
`;

export default function MusicDetail() {
  const params = useParams();
  const musicId = params.music_id;
  const { userInfo } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [album, setAlbum] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getMusic() {
      try {
        const { data, message } = await requestMusic(musicId);

        if (data) {
          setCurrentTrack(data.audios[0]);
          return setAlbum(data);
        }

        dispatch(occurError(message));
      } catch (err) {
        dispatch(occurError(err));
      }
    }

    getMusic();
  }, [musicId, dispatch]);

  function handleCurrentTrack(music) {
    setCurrentTrack(music);
  }

  if (!album) {
    return null;
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  return (
    <Container>
      {isModalOpen &&
        <Modal
          onClose={handleCloseModal}
        >
          <PaymentForm
            albumInfo={album}
            userInfo={userInfo}
          />
        </Modal>}
      <AlbumInfo album={album} onClick={handleOpenModal} />
      {album?.audios && <PlayList musics={album.audios} onClick={handleCurrentTrack} />}
      {currentTrack && <BottomPlayer music={currentTrack} image={album.image} />}
    </Container>
  );
}
