import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import styled from "styled-components";

import { loginRequest } from "../reducers/userSlice";

import Button from "../components/shared/Button";
import Input from "../components/shared/Input";

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

export default function LoginForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  function handleLogin(data) {
    dispatch(loginRequest(data));
  }

  return (
    <>
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
    </>
  );
}
