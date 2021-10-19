import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core/";
import styled from "styled-components";

import { logoutRequest } from "../reducers/userSlice";
import SearchForm from "../components/SearchFrom";
import SearchPreview from "../components/SearchPreview";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  margin-top: 5px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.color.white};

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
  margin-bottom: auto;
  width: 70%;
`;

export default function Header({ userInfo }) {
  const { email, profileImage } = userInfo || {};
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutRequest());
  }

  return (
    <Wrapper>
      <SearchBox>
        <SearchForm />
        <SearchPreview />
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
