import { all, call, put, takeLatest } from "@redux-saga/core/effects";

import requestSearchMusic from "../api/requestSearchMusic";
import requestCurrentMusic from "../api/requestCurrentMusic";
import {
  searchMusicRequest,
  searchMusicSuccess,
  searchMusicFailure,
} from "../reducers/searchSlice";
import {
  getCurrentMusicRequest,
  getCurrentMusicSuccess,
  getCurrentMusicFailure,
} from "../reducers/currentMusicSlice";
import { occurError } from "../reducers/errorSlice";

function* handleSearchMusicSaga({ payload }) {
  try {
    const { data, message } = yield call(requestSearchMusic, payload);

    if (data) {
      return yield put(searchMusicSuccess(data));
    }

    yield put(searchMusicFailure(message));
    yield put(occurError(message));
  } catch (err) {
    yield put(searchMusicFailure(err.message));
    yield put(occurError(err.message));
  }
}

function* handleGetCurrentMusicSaga({ payload }) {
  try {
    const { data, message } = yield call(requestCurrentMusic, payload);

    if (data) {
      return yield put(getCurrentMusicSuccess(data));
    }

    yield put(getCurrentMusicFailure(message));
    yield put(occurError(message));
  } catch (err) {
    yield put(getCurrentMusicFailure(err.message));
    yield put(occurError(err.message));
  }
}

export default function* musicSaga() {
  yield all([
    takeLatest(searchMusicRequest.type, handleSearchMusicSaga),
    takeLatest(getCurrentMusicRequest.type, handleGetCurrentMusicSaga),
  ]);
}
