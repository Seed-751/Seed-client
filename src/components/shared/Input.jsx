import styled from "styled-components";

const Input = styled.input`
  margin-top: 5px;
  width: ${(props) => (props.width || "100%")};
  height: ${(props) => (props.height || "45px")};
  border: 0.5px solid ${({ theme }) => theme.color.blue};
  border-radius: 50px;
  background-color: white;
  outline: none;
  text-align: center;
`;

export default Input;
