import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import PropTypes from "prop-types";
import styled from "styled-components";

import requestPayment from "../../api/requestPayment";
import { ERROR } from "../../constants";

import Input from "../Shared/Input";
import Button from "../Shared/Button";
import { selectUser } from "../../reducers/userSlice";
import { occurError } from "../../reducers/noticeSlice";
import { Avatar } from "@material-ui/core";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 300px;
  color: ${({ theme }) => theme.color.gray};

  strong {
    font-size: 30px;
    color: black;
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  p {
    padding: 0 5px;
    font-size: 14px;
  }

  form {
    width: 90%;
  }

  span {
    font-weight: bold;
    color: black;
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
  }

  input {
    border-radius: 5px;
    width: 100%;
  }
`;

const ArtistInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function Payment({ albumInfo, userInfo, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isLoggedIn } = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  function handlePay(data) {
    if (!isLoggedIn) {
      return dispatch(occurError(ERROR.requestLogin));
    }

    onClose();
    const amount = Number(data.amount);
    requestPayment({ albumInfo, amount, userInfo, dispatch, history });
  }

  return (
    <Wrapper>
      <strong>후원하기</strong>
      <ArtistInfoBox>
        <Avatar variant="circular" src={albumInfo.artist.profileImage} />
        <p>{albumInfo.artist.name}</p>
      </ArtistInfoBox>
      <p>
        <span>{albumInfo.title}</span> 앨범에 얼마를 후원 하시겟어요?
      </p>
      <form onSubmit={handleSubmit(handlePay)}>
        <InputBox>
          <label>Amount</label>
          <Input
            name="amount"
            type="number"
            autoComplete="off"
            {...register("amount", {
              required: ERROR.inputAmount,
            })}
          />
          <ErrorMessage
            errors={errors}
            name="amount"
            render={({ message }) => <p>{message}</p>}
          />
        </InputBox>
        <Button>Pay With Kakao</Button>
      </form>
    </Wrapper>
  );
}

Payment.propTypes = {
  albumInfo: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
