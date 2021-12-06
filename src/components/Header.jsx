import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core/";
import styled from "styled-components";

import { searchPreviewRequest } from "../reducers/searchPreviewSlice";
import { logoutRequest } from "../reducers/userSlice";
import useDropdown from "../hooks/useDropdown";

import SearchForm from "../components/form/SearchForm";
import SearchPreview from "../components/SearchPreview";
import Dropdown from "../components/shared/Dropdown";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
  margin-top: 5px;
  padding-top: 10px;

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
  const { profileImage } = userInfo || {};
  const currentHeader = <Avatar src={profileImage} />;
  const currentOptions = {
    Logout: handleLogout,
  };
  const { header, options } = useDropdown(currentHeader, currentOptions);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(searchPreviewRequest(searchInput));
  }, [dispatch, searchInput]);

  function handleChangeInput(e) {
    setSearchInput(e.target.value);
  }

  function handleLogout() {
    dispatch(logoutRequest());
    history.push("/");
  }

  function handleResetInput() {
    setSearchInput("");
  }

  return (
    <Wrapper>
      <SearchBox>
        <SearchForm onChange={handleChangeInput} onReset={handleResetInput} searchInput={searchInput} />
        <SearchPreview onReset={handleResetInput} searchInput={searchInput} />
      </SearchBox>
      <Box>
        {!userInfo
          ?
          <>
            <Link to="/login" className="link">Login</Link>
            <Link to="/signup" className="link">Signup</Link>
          </>
          :
          <Dropdown
            header={header}
            options={options}
          />
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
