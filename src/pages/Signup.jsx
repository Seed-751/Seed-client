import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import theme from "../styles/theme";

import { selectUser } from "../reducers/userSlice";
import SignupFrom from "../components/Pages/Signup/SignupForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 50px;
  padding: 10px;
  width: 500px;
  text-align: center;
  background-color: ${({ theme }) => theme.color.formDark};
  border-radius: 10px;

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
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
  }
`;

export default function Signup() {
  const { isSignupSuccess } = useSelector(selectUser);
  const history = useHistory();

  useEffect(() => {
    if (isSignupSuccess) {
      return history.push("/login");
    }
  }, [isSignupSuccess, history]);

  return (
    <Container>
      <strong>Sign up</strong>
      <SignupFrom />
      <p>
        Already have an Account?&nbsp;
        <Link to="/login" style={{ color: theme.color.green }}>
          Login
        </Link>
      </p>
    </Container>
  );
}
