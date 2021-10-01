import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyles from "./styles";
import theme from "./styles/theme";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

const Section = styled.section`
  width: calc(100% - 230px);
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.grey};
`;

const Wrapper = styled.div`
  display: flex;
`;

function App() {

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Navigation />
        <Section>
          <Header />
        </Section>
      </ThemeProvider>

    </Wrapper>
  );
}

export default App;
