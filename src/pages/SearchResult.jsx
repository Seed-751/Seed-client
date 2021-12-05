import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MusicList from "../components/MusicList";
import NoResult from "../components/NoResult";
import { selectSearch } from "../reducers/searchSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  gap: 30px;

  .title {
    font-size: 50px;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    flex-direction: row;
    font-size: 30px;
    gap: 20px;
  }
`;

const LinkButton = styled.button`
  color: ${({ active, theme }) => active ? "white" : theme.color.lightGray};
  font-size: 30px;
  border-bottom: ${({ active }) => active ? "2px solid white" : "none"};
`;

export default function SearchResult() {
  const [active, setActive] = useState({
    byTitle: true,
  });
  const { searchResult } = useSelector(selectSearch);
  const { albumsByTitle, albumsByArtist } = searchResult;

  function handleShowByTitle() {
    setActive({ byTitle: true });
  }

  function handleShowByArtist() {
    setActive({ byArtist: true });
  }

  return (
    <Container>
      <Nav>
        <ul>
          <LinkButton active={active.byTitle} onClick={handleShowByTitle}>Title</LinkButton>
          <LinkButton active={active.byArtist} onClick={handleShowByArtist}>Artist</LinkButton>
        </ul>
      </Nav>
      {active.byTitle &&
        <>
          {albumsByTitle?.length
            ? <MusicList data={albumsByTitle} />
            : <NoResult />
          }
        </>
      }
      {active.byArtist &&
        <>
          {albumsByArtist?.length
            ? <MusicList data={albumsByArtist} />
            : <NoResult />
          }
        </>
      }
    </Container>
  );
}
