import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  height: 55px;
  padding: 0 20px;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};

  div {
    display: flex;
    margin-left: auto;
    align-items: center;
  }
`;

const Text = styled.span`
  margin-right: 10px;
  font-size: 14px;
`;

export default function Header({ userInfo }) {
  const { email } = userInfo || {};

  return (
    <Wrapper>
      <div>
        <Text>Hello {email}</Text>
      </div>
    </Wrapper>
  );
}

Header.propTypes = {
  userInfo: PropTypes.shape({
    email: PropTypes.string,
  }),
};
