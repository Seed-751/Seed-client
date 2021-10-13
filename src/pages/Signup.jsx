import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import theme from "../styles/theme";
import { selectUser, signupRequest } from "../reducers/userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { INITIAL_PREVIEW_IMAGE } from "../constants";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  text-align: center;

  div > * {
    display: block;
    width: 400px;
  }

  strong {
    font-size: 30px;
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
    margin-left: 15px;
  }

  p {
    margin: 0;
    margin-left: 15px;
    color: red;
  }
`;

const PreviewBox = styled.div`
  margin-top: 10px;
  width:  100px;
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

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
  passwordConfirm: yup.string().oneOf([yup.ref("password")]).required(),
  name: yup.string().required(),
}).required();

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { isSignupSuccess } = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [previewImage, setPreviewImage] = useState(INITIAL_PREVIEW_IMAGE);

  function handleImage(e) {
    e.target.files[0]
      ? setPreviewImage(URL.createObjectURL(e.target.files[0]))
      : setPreviewImage(INITIAL_PREVIEW_IMAGE);
  }

  function handleSignup(data) {
    dispatch(signupRequest(data));
  }

  useEffect(() => {
    if (isSignupSuccess) {
      return history.push("/login");
    }

  }, [isSignupSuccess, history]);

  return (
    <Container>
      <div>
        <strong>Sign up</strong>
        <form onSubmit={handleSubmit(handleSignup)}>
          <InputBox>
            <label>Profile Image</label>
            <PreviewBox>
              <img src={previewImage} />
            </PreviewBox>
            <UploadImageInput
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

          <InputBox>
            <label>Password confirm</label>
            <Input
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
            <label>Name</label>
            <Input
              name="name"
              {...register("name")}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => <p>{message}</p>}
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
