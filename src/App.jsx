import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import { authCheckRequest, selectUser } from "./reducers/userSlice";
import { selectError } from "./reducers/errorSlice";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import PrivateRoute from "./components/PrivateRoute";
import Modal from "./components/Modal/Modal";
import Error from "./components/Modal/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MusicDetail from "./pages/MusicDetail";
import Upload from "./pages/Upload";

import GlobalStyles from "./styles";
import theme from "./styles/theme";
import getCookie from "./utils/getCookie";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: calc(100% - 230px);
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
`;

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { userInfo, isLoggedIn } = useSelector(selectUser);
  const { isError, message } = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      return handleLoaded(true);
    }

    if (!getCookie("token")) {
      return handleLoaded(true);
    }

    dispatch(authCheckRequest());

    // eslint-disable-next-line
  }, [isLoggedIn]);

  function handleLoaded(value) {
    setIsLoaded(value);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {isLoaded &&
        <>
          <Container>
            <Navigation />
            <Section>
              <Header userInfo={userInfo} />
              {isError &&
                <Modal isError={isError}>
                  <Error message={message}/>
                </Modal>
              }
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/musics/:music_id">
                  <MusicDetail />
                </Route>
                <PrivateRoute
                  path="/upload"
                  isAuthenticated={isLoggedIn}
                  component={Upload}
                />
                <Route path="/" exact>
                  <Redirect to="/dashboard" />
                </Route>
              </Switch>
            </Section>
          </Container>
        </>
      }
    </ThemeProvider>
  );
}
