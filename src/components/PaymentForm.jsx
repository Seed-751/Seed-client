import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import requestPayment from "../api/requestPayment";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { ERROR } from "../constants";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;

  div > * {
    display: block;
  }

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

export default function PaymentForm({ albumInfo, userInfo }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function handlePayment(data) {
    const amount = Number(data.amount);
    requestPayment({ albumInfo, amount, userInfo });
  }

  return (
    <Wrapper>
      <h1>후원하기</h1>
      <div>
        <p>{albumInfo.title} 앨범에 얼마를 후원 하시겟어요?</p>
      </div>
      <form onSubmit={handleSubmit(handlePayment)}>
        <InputBox>
          <label>Amount</label>
          <Input
            name="amount"
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

PaymentForm.propTypes = {
  albumInfo: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired,
};
