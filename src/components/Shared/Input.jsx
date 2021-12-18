import styled from "styled-components";

const Input = styled.input`
  margin-top: 10px;
  width: ${(props) => (props.width || "100%")};
  height: ${(props) => (props.height || "45px")};
  border: 0.5px solid ${({ theme }) => theme.color.gray};
  border-radius: ${(props) => (props.borderRadius || "50px")};
  background-color: white;
  outline: none;
  text-align: center;
`;

export default Input;
