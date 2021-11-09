import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import requestPayment from "../api/requestPayment";
import { ERROR } from "../constants";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { selectUser } from "../reducers/userSlice";
import { occurError } from "../reducers/errorSlice";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 150px;
  width: 100%;

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

  form {
    width: 90%;
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

  input {
    border-radius: 5px;
    width: 100%;
  }
`;

export default function PaymentForm({ location }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isLoggedIn } = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const { albumInfo, userInfo } = location;

  function handlePayment(data) {
    if (!isLoggedIn) {
      return dispatch(occurError(ERROR.requestLogin));
    }

    const amount = Number(data.amount);
    requestPayment({ albumInfo, amount, userInfo, dispatch, history });
  }

  return (
    <Wrapper>
      <div>
        <h1>후원하기</h1>
        <div>
          <p>{albumInfo.title} 앨범에 얼마를 후원 하시겟어요?</p>
        </div>
        <form onSubmit={handleSubmit(handlePayment)}>
          <InputBox>
            <label>Amount</label>
            <Input
              name="amount"
              autocomplete="off"
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
      </div>
    </Wrapper>
  );
}

PaymentForm.propTypes = {
  location: PropTypes.shape({
    albumInfo: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
  }),
};
