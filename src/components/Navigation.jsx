import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Navigation() {
  return (
    <Wrapper>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 230px;
  padding: ${({ theme }) => theme.padding.default};
  background-color: ${({ theme }) => theme.color.blue};
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => theme.color.gray};

  nav {
    margin-top: 40px;
    padding-top: 15px;
    border-top: 1px solid ${({ theme }) => theme.color.gray};
    font-weight: 700;
    letter-spacing: 0.04em;

    * {
      color: ${({ theme }) => theme.color.white}
    };

    li {
      padding: 10px 0;
      font-size: 15px;
    }
  }
`;
