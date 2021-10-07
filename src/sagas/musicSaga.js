import { all, call, put, takeLatest } from "@redux-saga/core/effects";

import requestMusics from "../api/requestMusics";
import {
  getMusicsRequest,
  getMusicsSuccess,
  getMusicsFailure,
} from "../reducers/musicSlice";

function* handleGetMusics() {
  try {
    const { data, message } = yield call(requestMusics);

    if (data) {
      return yield put(getMusicsSuccess(data));
    }

    yield put(getMusicsFailure(message));
  } catch (err) {
    yield put(getMusicsFailure(err.message));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(getMusicsRequest.type, handleGetMusics)
  ]);
}
