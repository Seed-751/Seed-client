import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CheckCircle, SmsFailed } from "@material-ui/icons/";

import Button from "../Shared/Button";
import { confirm } from "../../reducers/noticeSlice";
import { NOTICE } from "../../constants";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 300px;

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
    background-color: ${({ type, theme }) => {
  if (type === NOTICE.typeNotice) {
    return theme.color.notice;
  }

  return theme.color.error;
}};
    width: 50%;
  }

  .icon {
    font-size: 100px;
    color: ${({ type, theme }) => {
  if (type === NOTICE.typeNotice) {
    return theme.color.notice;
  }

  return theme.color.error;
}};;
  }
`;

export default function Notice({ type, message }) {
  const dispatch = useDispatch();

  function handleConfirmButton() {
    dispatch(confirm());
  }

  const isNotice = type === NOTICE.typeNotice;
  const isError = type === NOTICE.typeError;

  return (
    <Wrapper type={type}>
      {isNotice && <CheckCircle className="icon" />}
      {isError && <SmsFailed className="icon" />}
      <p>{message}</p>
      <Button type="button" onClick={handleConfirmButton}>OK</Button>
    </Wrapper>
  );
}

Notice.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
