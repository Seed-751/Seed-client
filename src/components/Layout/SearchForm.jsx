import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconButton } from "@material-ui/core/";
import { Search } from "@material-ui/icons/";

import { searchMusicRequest } from "../../reducers/searchSlice";
import Input from "../Shared/Input";

const Form = styled.form`
  z-index: 3;
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
  background-color: white;
  border-radius: 30px;
  flex-shrink: 0;

  .search-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: ${({ theme }) => theme.color.lightGray};
    text-decoration:none;
  }
`;

const SearchInput = styled(Input)`
  margin: 0;
  border: 0;
  outline: 0;
  background: none;
  width: 100%;
  line-height: 40px;
  padding: 0 20px;
  color: ${({ theme }) => theme.color.lightGray};
  text-align: start;
`;

export default function SearchForm({
  onChange,
  onReset,
  searchInput,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  function handleSearchMusic(e) {
    e.preventDefault();

    if (!searchInput) {
      return null;
    }

    dispatch(searchMusicRequest(searchInput));
    onReset();
    history.push(`/searchResult/${searchInput}`);
  }

  return (
    <Form onSubmit={handleSearchMusic}>
      <SearchInput
        type="text"
        name="search"
        value={searchInput}
        placeholder="Search..."
        onChange={onChange}
        autoComplete="off"
      />
      <IconButton
        aria-label="search"
        type="submit"
        className="search-icon"
      >
        <Search />
      </IconButton>
    </Form>
  );
}

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
};
