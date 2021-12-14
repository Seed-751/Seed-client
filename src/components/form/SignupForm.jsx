import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";

import { signupRequest } from "../../reducers/userSlice";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { INITIAL_PREVIEW_IMAGE } from "../../constants";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: 100%;
  text-align: left;

  label {
    padding: 5px;
  }

  p {
    padding: 10px 0 0 10px;
    color: red;
  }
`;

const PreviewBox = styled.div`
  margin-top: 10px;
  width: 100px;
  height: 200px;

  img {
    width: inherit;
    height: inherit;
    object-fit: contain;
  }
`;

const UploadImageInput = styled(Input)`
  height: 30px;
  outline: none;
  border-style: dashed;
  border-color: ${({ theme }) => theme.color.gray};
  border-width: 2px;
  border-radius: 2px;
`;

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")])
      .required(),
    name: yup.string().required(),
  })
  .required();

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [previewImage, setPreviewImage] = useState(INITIAL_PREVIEW_IMAGE);
  const dispatch = useDispatch();

  function handleImage(e) {
    e.target.files[0]
      ? setPreviewImage(URL.createObjectURL(e.target.files[0]))
      : setPreviewImage(INITIAL_PREVIEW_IMAGE);
  }

  function handleSignup(data) {
    dispatch(signupRequest(data));
  }

  return (
    <Form onSubmit={handleSubmit(handleSignup)}>
      <InputBox>
        <label id="profile-image-label">Profile Image</label>
        <PreviewBox>
          <img alt="profile image preview" src={previewImage} />
        </PreviewBox>
        <UploadImageInput
          aria-labelledby="profile-image-label"
          type="file"
          name="profileImage"
          accept="image/*"
          {...register("profileImage", {
            onChange: handleImage,
          })}
        />
        <ErrorMessage
          errors={errors}
          name="profileImage"
          render={({ message }) => <p>{message}</p>}
        />
      </InputBox>

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

      <InputBox>
        <label id="password-confirm-label">Password confirm</label>
        <Input
          aria-labelledby="password-confirm-label"
          type="password"
          name="passwordConfirm"
          {...register("passwordConfirm")}
          autoComplete="new-password"
        />
        <ErrorMessage
          errors={errors}
          name="passwordConfirm"
          render={({ message }) => <p>{message}</p>}
        />
      </InputBox>

      <InputBox>
        <label id="name-label">Name</label>
        <Input aria-labelledby="name-label" name="name" {...register("name")} />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => <p>{message}</p>}
        />
      </InputBox>

      <Button type="submit">Sign up</Button>
    </Form>
  );
}
