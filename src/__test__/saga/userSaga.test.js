import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

import userReducer from "../../reducers/userSlice";

import {
  handleSignupSaga,
  handleLoginSaga,
  handleAuthCheckSaga,
  handleLogoutSaga,
} from "../../sagas/userSaga";

import requestSignup from "../../api/requestSignup";
import requestLogin from "../../api/requestLogin";
import requestAuthCheck from "../../api/requestAuthCheck";
import requestLogout from "../../api/requestLogout";

describe("Request signup in userSaga test", () => {
  it("Request signup success => ", () => {
    const data = {
      email: "test@gmail.com",
      password: "test",
      name: "test",
    };

    const response = {
      success: true,
    };

    return expectSaga(handleSignupSaga, { payload: data })
      .withReducer(userReducer)
      .provide([[call(requestSignup, data), response]])
      .put({ type: "user/signupSuccess", payload: undefined })
      .hasFinalState({
        userInfo: null,
        isLoading: false,
        isLoggedIn: false,
        isSignupSuccess: true,
        error: null,
      })
      .silentRun();
  });

  it("Request signup failure => ", () => {
    const data = {
      email: "test@gmail.com",
      password: "test",
      name: "test",
    };

    const response = {
      message: "요청에 실패하셧습니다",
    };

    return expectSaga(handleSignupSaga, { payload: data })
      .withReducer(userReducer)
      .provide([[call(requestSignup, data), response]])
      .put({ type: "user/signupFailure", payload: response.message })
      .hasFinalState({
        userInfo: null,
        isLoading: false,
        isLoggedIn: false,
        isSignupSuccess: false,
        error: response.message,
      })
      .silentRun();
  });
});

describe("Request login in userSaga test", () => {
  it("Request login success => ", () => {
    const data = {
      email: "test@gmail.com",
      password: "test",
    };

    const response = {
      success: true,
      data: {
        userInfo: {
          email: "test@gmail.com",
          _id: "test",
        },
        token: "testToken",
      },
    };

    return expectSaga(handleLoginSaga, { payload: data })
      .withReducer(userReducer)
      .provide([[call(requestLogin, data), response]])
      .put({ type: "user/loginSuccess", payload: response.data })
      .hasFinalState({
        userInfo: response.data.userInfo,
        isLoading: false,
        isLoggedIn: true,
        isSignupSuccess: false,
        error: null,
      })
      .silentRun();
  });

  it("Request login failure => ", () => {
    const data = {
      email: "test@gmail.com",
      password: "test",
    };

    const response = {
      message: "요청에 실패하셧습니다"
    };

    return expectSaga(handleLoginSaga, { payload: data })
      .withReducer(userReducer)
      .provide([[call(requestLogin, data), response]])
      .put({ type: "user/loginFailure", payload: response.message })
      .hasFinalState({
        userInfo: null,
        isLoading: false,
        isLoggedIn: false,
        isSignupSuccess: false,
        error: response.message,
      })
      .silentRun();
  });
});

describe("Request authCheck in userSaga test", () => {
  it("Request authCheck success => ", () => {
    const token = "testToken";

    const response = {
      success: true,
      data: {
        email: "test@gmail.com",
        _id: "test",
      },
    };

    return expectSaga(handleAuthCheckSaga, { payload: token })
      .withReducer(userReducer)
      .provide([[call(requestAuthCheck, token), response]])
      .put({ type: "user/authCheckSuccess", payload: response.data })
      .hasFinalState({
        userInfo: response.data,
        isLoading: false,
        isLoggedIn: true,
        isSignupSuccess: false,
        error: null,
      })
      .silentRun();
  });

  it("Request authCheck failure => ", () => {
    const data = {
      email: "test@gmail.com",
      password: "test",
    };

    const response = {
      message: "요청에 실패하셧습니다"
    };

    return expectSaga(handleAuthCheckSaga, { payload: data })
      .withReducer(userReducer)
      .provide([[call(requestAuthCheck, data), response]])
      .put({ type: "user/authCheckFailure", payload: response.message })
      .hasFinalState({
        userInfo: null,
        isLoading: false,
        isLoggedIn: false,
        isSignupSuccess: false,
        error: response.message,
      })
      .silentRun();
  });
});

describe("Request logout in userSaga test", () => {
  it("Request logout success => ", () => {
    const response = {
      success: true,
    };

    return expectSaga(handleLogoutSaga)
      .withReducer(userReducer)
      .provide([[call(requestLogout), response]])
      .put({ type: "user/logoutSuccess", payload: undefined})
      .hasFinalState({
        userInfo: null,
        isLoading: false,
        isLoggedIn: false,
        isSignupSuccess: false,
        error: null,
      })
      .silentRun();
  });

  it("Request logout failure => ", () => {
    const response = {
      message: "요청에 실패하셧습니다"
    };

    return expectSaga(handleLogoutSaga)
      .withReducer(userReducer)
      .provide([[call(requestLogout), response]])
      .put({ type: "user/logoutFailure", payload: response.message })
      .hasFinalState({
        userInfo: null,
        isLoading: false,
        isLoggedIn: true,
        isSignupSuccess: false,
        error: response.message,
      })
      .silentRun();
  });
});
