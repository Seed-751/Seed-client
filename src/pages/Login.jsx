import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { selectUser, loginRequest } from "../reducers/userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";

import Button from "../components/shared/Button";
import Input from "../components/shared/Input";

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

  p {
    margin: 0;
    margin-left: 15px;
    color: red;
  }
`;

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { isLoggedIn } = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogin(data) {
    dispatch(loginRequest(data));
  }

  useEffect(() => {
    if (isLoggedIn) {
      return history.push("/");
    }

  }, [isLoggedIn]);

  return (
    <Container>
      <div>
        <strong>Welcome back!</strong>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <InputBox>
            <label>Email</label>
            <Input
              type="email"
              name="email"
              {...register("email")}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p>{message}</p>}
            />
          </InputBox>
          <InputBox>
            <label>Password</label>
            <Input
              type="password"
              name="password"
              {...register("password")}
              autoComplete="new-password"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p>{message}</p>}
            />
          </InputBox>
          <Button type="submit">Login</Button>
        </form>
        <p>
          Not registerd yet?&nbsp;
          <Link to="/signup" style={{ color: ({ theme }) => theme.color.blue }}>Create an Account</Link>
        </p>
      </div>
    </Container>
  );
}
