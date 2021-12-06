import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 10px;
  padding: 3px;
  height: 45px;
  line-height: 45px;
  text-align: left;
  vertical-align: bottom;
`;

const Header = styled.div`
  cursor: pointer;
  justify-content: center;
  padding: 0 5px;
  font-weight: 500;
  font-size: 14px;
`;

const List = styled.ul`
  margin-top: 5px;
  width: 100px;
  z-index: 1;
  border-radius: 5px;
  border: 0.5px solid ${({ theme }) => theme.color.gray};
  color: ${({ theme }) => theme.color.green};
  font-size: 14px;

  div {
    justify-content: center;
    cursor: pointer;
  }
`;

export default function Dropdown({ header, options }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClickToggle() {
    setIsOpen(!isOpen);
  }

  function handleClickOption(optionFunc) {
    optionFunc();
    setIsOpen(false);
  }

  return (
    <Wrapper isOpen={isOpen} onClick={handleClickToggle}>
      <Header onClick={handleClickToggle}>
        {header}
      </Header>
      {isOpen &&
        <List>
          {Object.entries(options).map((option) => {
            const optionName = option[0];
            const optionFunc = option[1];
            return <div key={optionName} onClick={() => handleClickOption(optionFunc)}>{optionName}</div>;
          })}
        </List>
      }
    </Wrapper>
  );
}

Dropdown.propTypes = {
  header: PropTypes.element.isRequired,
  options: PropTypes.shape({
    [PropTypes.stiring]: PropTypes.func,
  }).isRequired,
};
