import styled from "styled-components";

const Button = styled.button`
  width: ${(props) => (props.width || "100%")};
  height: ${(props) => (props.height || "45px")};
  border-radius: 50px;
  background-color: ${({ theme }) => theme.color.blue};
  vertical-align: middle;
  color: ${({ theme }) => theme.color.white};
`;

export default Button;
