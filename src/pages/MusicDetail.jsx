import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import BottomPlayer from "../components/BottomPlayer";
import AlbumInfo from "../components/AlbumInfo";
import PlayList from "../components/PlayList";

import { ERROR } from "../constants";
import { selectUser } from "../reducers/userSlice";
import { occurError } from "../reducers/errorSlice";
import { getCurrentMusicRequest, selectCurrentMusic, initiateCurrentMusic } from "../reducers/currentMusicSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 3%;
  margin-left: 10%;
`;

export default function MusicDetail() {
  const params = useParams();
  const history = useHistory();
  const musicId = params.music_id;
  const { userInfo, isLoggedIn } = useSelector(selectUser);
  const { music: album } = useSelector(selectCurrentMusic);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentMusicRequest(musicId));

    return () => {
      dispatch(initiateCurrentMusic());
    };
  }, [musicId, dispatch]);

  function handlePaymentPage() {
    if (!isLoggedIn) {
      return dispatch(occurError(ERROR.requestLogin));
    }

    history.push({
      pathname: `/payment/${album._Id}/${userInfo._id}`,
      albumInfo: album,
      userInfo,
    });
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
        </Container>
      }
    </>
  );
}
