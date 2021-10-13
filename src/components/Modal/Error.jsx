import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Button from "../shared/Button";
import { confirmError } from "../../reducers/errorSlice";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 200px;

  strong {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: red;
  }

  p {
    font-size: 20px;
    color: ${({ theme }) => theme.color.gray};
  }

  button {
    width: 50%;
  }
`;

export default function Error({ message }) {
  const history = useHistory();
  const dispatch = useDispatch();

  function handleConfirmButton() {
    dispatch(confirmError());
    history.push("/");
  }

  return (
    <Wrapper>
      <strong>Error</strong>
      <p>{message}</p>
      <Button type="button" onClick={handleConfirmButton}>Go Home</Button>
    </Wrapper>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
