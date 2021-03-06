import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.nav`
  width: 230px;
  padding: ${({ theme }) => theme.padding.default};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.lightBlack};

  strong {
    font-size: 30px;
    color: ${({ theme }) => theme.color.green};
  }

  nav {
    margin-top: 20px;
    padding-top: 15px;
    font-weight: 700;
    letter-spacing: 0.04em;

    * {
      color: ${({ theme }) => theme.color.green};
    }

    li {
      padding: 10px 0;
    }

    .link{
      font-size: 20px;
      color: ${({ theme }) => theme.color.lightGray};
    }
  }
`;

export default function Navigation() {
  return (
    <Wrapper>
      <strong><Link to="/">Seed</Link></strong>
      <nav>
        <ul>
          <li>
            <Link className="link" to="/">Home</Link>
          </li>
          <li>
            <Link className="link" to="/upload">Upload</Link>
          </li>
          <li>
            <Link className="link" to="/mypage">My list</Link>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
}
