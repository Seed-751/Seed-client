import { all, call, put, takeLatest } from "@redux-saga/core/effects";

import requestLogin from "../api/requestLogin";
import requestSignup from "../api/requestSignup";
import requestAuthCheck from "../api/requestAuthCheck";
import {
  signupRequest,
  signupSuccess,
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  authCheckRequest,
  authCheckSuccess,
  authCheckFailure,
} from "../reducers/userSlice";

function* handleSignupSaga({ payload }) {
  try {
    const { success, message } = yield call(requestSignup, payload);

    if (success) {
      return yield put(signupSuccess());
    }

    yield put(signupFailure(message));
  } catch (err) {
    yield put(signupFailure(err.message));
  }
}

function* handleLoginSaga({ payload }) {
  try {
    const { data, message } = yield call(requestLogin, payload);

    if (data) {
      return yield put(loginSuccess(data));
    }

    yield put(loginFailure(message));
  } catch (err) {
    yield put(loginFailure(err.message));
  }
}

function* handleAuthCheck() {
  try {
    const { data, message } = yield call(requestAuthCheck);

    if (data) {
      return yield put(authCheckSuccess(data));
    }

    yield put(authCheckFailure(message));
  } catch (err) {
    yield put(authCheckFailure(err.message));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(signupRequest.type, handleSignupSaga),
    takeLatest(loginRequest.type, handleLoginSaga),
    takeLatest(authCheckRequest.type, handleAuthCheck),
  ]);
}