import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import requestMusic from "../api/requestMuic";
import BottomPlayer from "../components/BottomPlayer";

const Container = styled.div`
`;

export default function MusicDetail() {
  const params = useParams();
  const musicId = params.music_id;
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    async function getMusic() {
      try {
        const { data, message } = await requestMusic(musicId);

        if (data) {
          return setAlbum(data);
        }

        console.log(message);
      } catch (err) {
        console.log(err);
      }
    }

    getMusic();
  }, [musicId]);

  return (
    <Container>
      <BottomPlayer />
    </Container>
  );
}
