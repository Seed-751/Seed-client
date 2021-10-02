import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyles from "./styles";
import theme from "./styles/theme";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Section = styled.section`
  width: calc(100% - 230px);
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
`;

function App() {

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Navigation />
        <Section>
          <Header />
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/Signup">
              <Signup/>
            </Route>
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </Section>
      </ThemeProvider>

    </Container>
  );
}

export default App;
