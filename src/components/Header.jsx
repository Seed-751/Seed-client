import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { IconButton, Avatar } from "@material-ui/core/";
import { Search } from "@material-ui/icons/";
import styled from "styled-components";

import { logoutRequest } from "../reducers/userSlice";

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

const SearchBox = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  width: 70%;
  height: 50px;
  background-color: ${({ theme }) => theme.color.lightGray};
  border-radius: 30px;
  padding: 10px;
  flex-shrink: 0;

  .search-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: white;
    text-decoration:none;
  }
`;

const Input = styled.input`
  border: 0;
  outline: 0;
  background: none;
  width: 100%;
  line-height: 40px;
  padding: 0 10px;
`;

const Box = styled.div`
  justify-content: space-evenly;
  width: 20%;

  .link {
    color: ${({ theme }) => theme.color.blue};
  }
`;

const Text = styled.div`
  padding-right: 0;
  gap: 10px;
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
        <Input type="text" name="" placeholder="Search..." />
        <IconButton className="search-icon">
          <Search />
        </IconButton>
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
