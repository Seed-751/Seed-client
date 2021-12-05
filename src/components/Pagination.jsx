import React, { useState, useEffect } from "react";
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

const ArrowButton = styled.button`
  font-size: 20px;
  color: ${({ active, theme }) => {
  if (active) {
    return "white";
  }

  return theme.color.lightGray;
}};
`;

const LinkButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color:${({ active }) => active ? "white" : "none"};
  color: ${({ active, theme }) => active ? "black" : theme.color.lightGray};
  font-size: 20px;
`;

export default function Pagination({ pageSize, totalData, currentPage, onPageChange }) {
  const [pages, setPages] = useState([]);
  const pageCount = Math.ceil(totalData / pageSize);

  useEffect(() => {
    onPageChange(1);
  }, [totalData]);

  useEffect(() => {
    const pages = new Array(pageCount).fill().map((_, i) => i + 1);
    const index = pages.findIndex((page) => page === currentPage);
    const digit = index.toString();
    const digitLength = digit.length;

    if (digitLength === 1) {
      setPages(pages.slice(0, 10));
      return;
    }

    const digitFirst = digit.slice(0, 1);
    const start = Number(digitFirst + "0");
    const end = Number(digitFirst + "9");

    setPages(pages.slice(start, end + 1));

    return(() => {
      onPageChange(1);
    });
  }, [currentPage, totalData]);

  function handlePrevButton() {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  }

  function handleNextButton() {
    if (currentPage === pageCount) {
      return;
    }

    onPageChange(currentPage + 1);
  }

  function handleFirstButton() {
    onPageChange(1);
  }

  function handleLastButton() {
    onPageChange(pageCount);
  }

  return (
    <Wrapper>
      {pages.length &&
        <Nav>
          <ul className="pagination">
            <ArrowButton active={currentPage !== 1} onClick={handleFirstButton}>{"<<"}</ArrowButton>
            <ArrowButton active={currentPage !== 1} onClick={handlePrevButton}>{"<"}</ArrowButton>
            {pages.map((page) => (
              <li
                key={page}
                className={page === currentPage ? "page-item active" : "page-item"}
                style={{ cursor: "pointer" }}
              >
                <LinkButton
                  active={currentPage === page}
                  className="page-link"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </LinkButton>
              </li>
            ))}
            <ArrowButton active={currentPage !== pageCount} onClick={handleNextButton}>{">"}</ArrowButton>
            <ArrowButton active={currentPage !== pageCount} onClick={handleLastButton}>{">>"}</ArrowButton>
          </ul>
        </Nav>
      }
    </Wrapper>
  );
}

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  totalData: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
