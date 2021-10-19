import { all, call, put, takeLatest } from "@redux-saga/core/effects";

import requestAllMusics from "../api/requestAllMusics";
import requestSearchMusic from "../api/requestSearchMusic";
import requestCurrentMusic from "../api/requestCurrentMusic";
import {
  getMusicsRequest,
  getMusicsSuccess,
  getMusicsFailure,
} from "../reducers/musicSlice";
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

function* handleGetMusicsSaga() {
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
    takeLatest(getMusicsRequest.type, handleGetMusicsSaga),
    takeLatest(searchMusicRequest.type, handleSearchMusicSaga),
    takeLatest(getCurrentMusicRequest.type, handleGetCurrentMusicSaga),
  ]);
}
