import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import { authCheckRequest, selectUser } from "./reducers/userSlice";

import GlobalStyles from "./styles";
import theme from "./styles/theme";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import getCookie from "./utils/getCookie";

const Section = styled.section`
  width: calc(100% - 230px);
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
`;

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { userInfo, isLoggedIn } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!getCookie("token")) {
      return handleLoaded(true);
    }

    dispatch(authCheckRequest());

    if (isLoggedIn) {
      return handleLoaded(true);
    }
  }, [isLoggedIn]);

  function handleLoaded(value) {
    setIsLoaded(value);
  }

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {isLoaded &&
          <>
            <Navigation />
            <Section>
              <Header userInfo={userInfo} />
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <PrivateRoute
                  path="/dashboard"
                  isAuthenticated={isLoggedIn}
                  component={Dashboard}
                />
                <Route path="/" exact>
                  <Redirect to="/dashboard" />
                </Route>
              </Switch>
            </Section>
          </>
        }
      </ThemeProvider>
    </Container>
  );
}
