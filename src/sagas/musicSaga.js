import { all, call, put, takeLatest } from "@redux-saga/core/effects";

import requestAllMusics from "../api/requestAllMusics";
import {
  getMusicsRequest,
  getMusicsSuccess,
  getMusicsFailure,
} from "../reducers/musicSlice";
import { occurError } from "../reducers/errorSlice";

function* handleGetMusics() {
  try {
    const { data, message } = yield call(requestAllMusics);

    if (data) {
      return yield put(getMusicsSuccess(data));
    }

    yield put(getMusicsFailure(message));
    yield put(occurError(message));
  } catch (err) {
    yield put(getMusicsFailure(err.message));
    yield put(occurError(err.message));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(getMusicsRequest.type, handleGetMusics)
  ]);
}
