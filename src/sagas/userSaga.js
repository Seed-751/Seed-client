import { all, call, put, takeLatest } from "@redux-saga/core/effects";

import requestLogin from "../api/requestLogin";
import requestSignup from "../api/requestSignup";
import requestAuthCheck from "../api/requestAuthCheck";
import requestLogout from "../api/requestLogout";
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
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from "../reducers/userSlice";
import { occurError } from "../reducers/errorSlice";

export function* handleSignupSaga({ payload }) {
  try {
    const { success, message } = yield call(requestSignup, payload);

    if (success) {
      return yield put(signupSuccess());
    }

    yield put(signupFailure(message));
    yield put(occurError(message));
  } catch (err) {
    yield put(signupFailure(err.message));
    yield put(occurError(err.message));
  }
}

export function* handleLoginSaga({ payload }) {
  try {
    const { data, message } = yield call(requestLogin, payload);

    if (data) {
      return yield put(loginSuccess(data));
    }

    yield put(loginFailure(message));
    yield put(occurError(message));
  } catch (err) {
    yield put(loginFailure(err.message));
    yield put(occurError(err.message));
  }
}

export function* handleAuthCheckSaga({ payload }) {
  try {
    const { data, message } = yield call(requestAuthCheck, payload);

    if (data) {
      return yield put(authCheckSuccess(data));
    }

    yield put(authCheckFailure(message));
    yield put(occurError(message));
  } catch (err) {
    yield put(authCheckFailure(err.message));
    yield put(occurError(err.message));
  }
}

export function* handleLogoutSaga() {
  try {
    const { success, message } = yield call(requestLogout);

    if (success) {
      return yield put(logoutSuccess());
    }

    yield put(logoutFailure(message));
    yield put(occurError(message));
  } catch (err) {
    yield put(logoutFailure(err.message));
    yield put(occurError(err.message));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(signupRequest.type, handleSignupSaga),
    takeLatest(loginRequest.type, handleLoginSaga),
    takeLatest(authCheckRequest.type, handleAuthCheckSaga),
    takeLatest(logoutRequest.type, handleLogoutSaga)
  ]);
}
