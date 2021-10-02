import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <Wrapper>
      <div>
        <Text>Welcome, {name}</Text>
      </div>
    </Wrapper>
  );
}

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
