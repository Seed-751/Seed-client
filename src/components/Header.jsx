import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core/";
import styled from "styled-components";

import { searchMusicRequest } from "../reducers/searchSlice";
import { logoutRequest } from "../reducers/userSlice";
import SearchForm from "../components/SearchForm";
import SearchPreview from "../components/SearchPreview";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
  margin-top: 5px;

  div {
    display: flex;
    align-items: center;
  }
`;

const Box = styled.div`
  justify-content: space-evenly;
  width: 20%;

  .link {
    color: ${({ theme }) => theme.color.green};
  }
`;

const Text = styled.div`
  padding-right: 0;
  gap: 10px;
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-left: 0;
  margin-bottom: auto;
  width: 50%;

`;

export default function Header({ userInfo }) {
  const { email, profileImage } = userInfo || {};
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(searchMusicRequest(searchInput));
  }, [dispatch, searchInput]);

  function handleChangeInput(e) {
    setSearchInput(e.target.value);
  }

  function handleLogout() {
    dispatch(logoutRequest());
  }

  function handleResetInput() {
    setSearchInput("");
  }

  return (
    <Wrapper>
      <SearchBox>
        <SearchForm onChange={handleChangeInput} searchInput={searchInput} />
        <SearchPreview onReset={handleResetInput} />
      </SearchBox>
      <Box>
        {!userInfo
          ?
          <>
            <Link to="/login" className="link">Login</Link>
            <Link to="/signup" className="link">Signup</Link>
          </>
          :
          <>
            <button type="button" className="link" onClick={handleLogout}>Logout</button>
            <Text>
              <Avatar src={profileImage} />
              {email}
            </Text>
          </>
        }
      </Box>
    </Wrapper>
  );
}

Header.propTypes = {
  userInfo: PropTypes.shape({
    email: PropTypes.string,
    profileImage: PropTypes.string,
  }),
};
