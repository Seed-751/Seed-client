import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import useInput from "../hooks/useInput";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import theme from "../styles/theme";

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

const InputBox = styled.div`
  margin-top: 10px;
  margin-Bottom: 10px;
  width: 100%;
  text-align: left;

  label {
    margin-left: 10px;
  }
`;

export default function Login() {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  return (
    <Container>
      <div>
        <strong>Welcome back!</strong>
        <h1>Login</h1>
        <from>
          <InputBox>
            <label>Email</label>
            <Input
              name="email"
              value={email}
              onChange={onChangeEmail}
              required
            />
          </InputBox>
          <InputBox>
            <label>Password</label>
            <Input
              name="password"
              value={password}
              type="password"
              onChange={onChangePassword}
              required
            />
          </InputBox>
          <Button type="submit">Login</Button>
        </from>
        <p>
          Not registerd yet?&nbsp;
          <Link to="/Signup" style={{ color: theme.color.blue }}>Create an Account</Link>
        </p>
      </div>
    </Container>
  );
}
