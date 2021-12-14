import React from "react";
import styled from "styled-components";
import UploadForm from "../components/form/UploadForm";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  text-align: center;

  strong {
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    width: 50%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin-top: 15px;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.formDark};
  border-radius: 5px;
`;

export default function Upload() {
  return (
    <Container>
      <Wrapper>
        <strong>Upload Music</strong>
        <UploadForm />
      </Wrapper>
    </Container>
  );
}
