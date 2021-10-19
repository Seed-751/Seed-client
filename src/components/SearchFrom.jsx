import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IconButton } from "@material-ui/core/";
import { Search } from "@material-ui/icons/";

import { searchMusicRequest } from "../reducers/searchSlice";
import Input from "../components/shared/Input";

const Form = styled.form`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
  background-color: ${({ theme }) => theme.color.lightGray};
  border-radius: 30px;
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

const SearchInput = styled(Input)`
  margin: 0;
  border: 0;
  outline: 0;
  background: none;
  width: 100%;
  line-height: 40px;
  padding: 0 20px;
  text-align: start;
`;

export default function SearchFrom() {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchMusicRequest(searchInput));
  }, [dispatch, searchInput]);

  function handleChangeInput(e) {
    setSearchInput(e.target.value);
  }

  return (
    <Form>
      <SearchInput
        type="text"
        name="search"
        value={searchInput}
        placeholder="Search..."
        onChange={handleChangeInput}
      />
      <IconButton className="search-icon" >
        <Search />
      </IconButton>
    </Form>
  );
}
