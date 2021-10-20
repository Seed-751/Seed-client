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
import Payment from "./pages/Payment";
import Error from "./components/Modal/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MusicDetail from "./pages/MusicDetail";
import MyPage from "./pages/MyList";
import Upload from "./pages/Upload";

import GlobalStyles from "./styles";
import theme from "./styles/theme";

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

    const token = localStorage.getItem("token");

    console.log(token);
    if (!token) {
      return handleLoaded(true);
    }

    dispatch(authCheckRequest(token));

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
            {isError &&
              <Modal isError={isError}>
                <Error message={message} />
              </Modal>
            }
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
                <PrivateRoute
                  path="/mypage"
                  isAuthenticated={isLoggedIn}
                  component={MyPage}
                />
                <PrivateRoute
                  path="/payment/:albumId/:userId"
                  isAuthenticated={isLoggedIn}
                  component={Payment}
                />
                <Route path="/" exact>
                  <Redirect to="/dashboard" />
                </Route>
                <Route path="*">
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
