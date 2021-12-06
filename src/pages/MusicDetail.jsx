import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import BottomPlayer from "../components/BottomPlayer";
import AlbumInfo from "../components/AlbumInfo";
import PlayList from "../components/PlayList";
import Modal from "../components/Modal/Modal";
import Payment from "../components/Modal/Payment";

import { ERROR } from "../constants";
import { selectUser } from "../reducers/userSlice";
import { occurError } from "../reducers/noticeSlice";
import { getCurrentMusicRequest, selectCurrentMusic, initiateCurrentMusic } from "../reducers/currentMusicSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 3%;
`;

export default function MusicDetail() {
  const params = useParams();
  const musicId = params.music_id;
  const { userInfo, isLoggedIn } = useSelector(selectUser);
  const { music: album } = useSelector(selectCurrentMusic);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getCurrentMusicRequest(musicId));

    return () => {
      dispatch(initiateCurrentMusic());
      handleClosePayment();
    };
  }, [musicId, dispatch]);

  function handlePaymentPage() {
    if (!isLoggedIn) {
      return dispatch(occurError(ERROR.requestLogin));
    }

    handleOpenPayment();
  }

  function handleOpenPayment() {
    setIsOpen(true);
  }

  function handleClosePayment() {
    setIsOpen(false);
  }

  if (!album) {
    return null;
  }

  return (
    <>
      {album &&
        <Container>
          <AlbumInfo album={album} onClick={handlePaymentPage} />
          <PlayList musics={album.audios} />
          <BottomPlayer image={album.image} />
          {isOpen &&
            <Modal
              isNotNotice={true}
              onClose={handleClosePayment}
            >
              <Payment
                albumInfo={album}
                userInfo={userInfo}
                onClose={handleClosePayment}
              />
            </Modal>}
        </Container>
      }
    </>
  );
}
