import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import jsmediatags from "jsmediatags";
import styled from "styled-components";

import requestMusic from "../api/requestMuic";
import BottomPlayer from "../components/BottomPlayer";
import AlbumInfo from "../components/AlbumInfo";
import PlayList from "../components/PlayList";

const Container = styled.div`
`;

export default function MusicDetail() {
  const params = useParams();
  const musicId = params.music_id;
  const [album, setAlbum] = useState(null);
  const [currentMusic, setCurrentMusic] = useState(null);

  useEffect(() => {
    async function getMusic() {
      try {
        const { data, message } = await requestMusic(musicId);

        if (data) {
          setCurrentMusic(data.audios[0]);
          return setAlbum(data);
        }

        console.log(message);
      } catch (err) {
        console.log(err);
      }
    }

    getMusic();
  }, [musicId]);

  // if (album) {
  //   const temp = album.audios[0];
  //   console.log("🥰", temp);
  //   new jsmediatags.Reader(temp), {
  //     onSuccess: function (tag) {
  //       console.log(tag);
  //     }
  //   };
  // }
  // fucntion handleCurrentMusic() {
  
  // }
  if (!album) {
    return null;
  }

  return (
    <Container>
      <AlbumInfo />
      {/* {album?.audios.map((music) => (
        <PlayList key={music} music={music} />
      ))} */}
      {currentMusic && <BottomPlayer music={currentMusic} />}
    </Container>
  );
}
