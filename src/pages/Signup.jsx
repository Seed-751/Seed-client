import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import useInput from "../hooks/useInput";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
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

const Message = styled.p`
  margin: 0;
  font-size: 10px;
  color: red;
`;

export default function Signup() {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordConfirm, onChangePasswordConfirm] = useInput("");

  return (
    <Container>
      <div>
        <h1>Sign up</h1>
        <form
          name="form"
        >
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
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </InputBox>
          <InputBox>
            <label>Password confirm</label>
            <Input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
              required
            />
          </InputBox>
          <Button type="submit">Sign up</Button>
        </form>
        <div>
          <p>
            Already have an Account?&nbsp;
            <Link to="/login" style={{ color: theme.color.blue }}>Login</Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
