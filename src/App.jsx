import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import { authCheckRequest, selectUser } from "./reducers/userSlice";
import { selectNotice } from "./reducers/noticeSlice";

import Header from "./components/Header";
import Navigation from "./components/Navigation";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const Modal = lazy(() => import("./components/Modal/Modal"));
const Notice = lazy(() => import("./components/Modal/Notice"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const MusicDetail = lazy(() => import("./pages/MusicDetail"));
const SearchResult = lazy(() => import("./pages/SearchResult"));
const MyList = lazy(() => import("./pages/MyList"));
const Upload = lazy(() => import("./pages/Upload"));

import GlobalStyles from "./styles";
import theme from "./styles/theme";

const Section = styled.section`
  display: flex;
  padding: 0px 90px 0px 90px;
  width: 80%;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
`;

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { userInfo, isLoggedIn } = useSelector(selectUser);
  const { isOpen, message, type } = useSelector(selectNotice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      return handleLoaded(true);
    }

    const token = localStorage.getItem("token");

    if (token === "null" || !token) {
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
            <Suspense fallback={<div></div>}>
              {isOpen &&
                <Modal>
                  <Notice
                    type={type}
                    message={message}
                  />
                </Modal>
              }
            </Suspense>
            <Navigation />
            <Section>
              <Header userInfo={userInfo} />
              <Switch>
                <Suspense fallback={<div></div>}>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/signup">
                    <Signup />
                  </Route>
                  <Route path="/searchResult/:keword">
                    <SearchResult />
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
                    component={MyList}
                  />
                  <Route path="/" exact>
                    <Redirect to="/dashboard" />
                  </Route>
                  <Route path="*">
                    <Redirect to="/dashboard" />
                  </Route>
                </Suspense>
              </Switch>
            </Section>

          </Container>
        </>
      }
    </ThemeProvider>
  );
}
