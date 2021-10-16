import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import BottomPlayer from "../components/BottomPlayer";
import AlbumInfo from "../components/AlbumInfo";
import PlayList from "../components/PlayList";

import requestMusic from "../api/requestMusic";
import { selectUser } from "../reducers/userSlice";
import { occurError } from "../reducers/errorSlice";

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
  const { userInfo } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [album, setAlbum] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

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

  function handlePaymentPage() {
    history.push({
      pathname: `/payment/${album._Id}/${userInfo._id}`,
      albumInfo: album,
      userInfo,
    });
  }

  return (
    <>
      {album &&
        <Container>
          <AlbumInfo album={album} onClick={handlePaymentPage} />
          <PlayList musics={album.audios} onClick={handleCurrentTrack} />
          <BottomPlayer music={currentTrack} image={album.image} />
        </Container>
      }
    </>
  );
}
