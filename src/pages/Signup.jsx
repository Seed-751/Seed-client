import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import theme from "../styles/theme";

import { selectUser } from "../reducers/userSlice";
import SignupFrom from "../components/form/SignupForm";

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
      <div>
        <strong>Sign up</strong>
        <SignupFrom />
        <div>
          <p>
            Already have an Account?&nbsp;
            <Link to="/login" style={{ color: theme.color.green }}>Login</Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
