import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import theme from "../styles/theme";
import LoginForm from "../components/LoginForm";
import { selectUser } from "../reducers/userSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  text-align: center;

  div > * {
    display: block;
    width: 400px;
  }

  strong {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  p {
    margin-top: 28px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
  }
`;

export default function Login() {
  const { isLoggedIn } = useSelector(selectUser);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      return history.push("/");
    }
  }, [isLoggedIn, history]);

  return (
    <Container>
      <div>
        <strong>Welcome back!</strong>
        <h1>Login</h1>
        <LoginForm />
        <p>
          Not registerd yet?&nbsp;
          <Link to="/signup" style={{ color: theme.color.green }}>Create an Account</Link>
        </p>
      </div>
    </Container>
  );
}
