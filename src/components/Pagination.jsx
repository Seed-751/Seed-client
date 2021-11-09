import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0px;
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

export default function Pagination({ pageSize, totalData, currentPage, onPageChange }) {
  const pageCount = Math.ceil(totalData / pageSize);

  const pages = new Array(pageCount).fill().map((_, i) => i + 1);

  return (
    <Wrapper>
      <Nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={page === currentPage ? "page-item active" : "page-item"}
              style={{ cursor: "pointer" }}>
              <LinkButton className="page-link" onClick={() => onPageChange(page)}>{page}</LinkButton>
            </li>
          ))}
        </ul>
      </Nav>
    </Wrapper>
  );
}

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  totalData: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
