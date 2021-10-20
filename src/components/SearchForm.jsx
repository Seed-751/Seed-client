import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core/";
import { Search } from "@material-ui/icons/";

import Input from "./shared/Input";

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

export default function SearchForm({ onChange, searchInput }) {

  return (
    <Form>
      <SearchInput
        type="text"
        name="search"
        value={searchInput}
        placeholder="Search..."
        onChange={onChange}
      />
      <IconButton className="search-icon" >
        <Search />
      </IconButton>
    </Form>
  );
}

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
};
