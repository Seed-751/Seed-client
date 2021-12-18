import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import styled from "styled-components";

import { loginRequest } from "../../../reducers/userSlice";

import Button from "../../Shared/Button";
import Input from "../../Shared/Input";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 0;
  width: 400px;
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

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function LoginForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleLogin(data) {
    dispatch(loginRequest(data));
  }

  return (
    <>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <InputBox>
          <label id="email-label">Email</label>
          <Input
            aria-labelledby="email-label"
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
          <label id="password-label">Password</label>
          <Input
            aria-labelledby="password-label"
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
      </Form>
    </>
  );
}
