import { all, call, put, takeLatest } from "@redux-saga/core/effects";

import requestSearchPreview from "../api/requestSearchPreview";
import requestSearchMusic from "../api/requestSearchMusic";
import requestCurrentMusic from "../api/requestCurrentMusic";
import requestMusics from "../api/requestMusics";
import {
  searchPreviewRequest,
  searchPreviewSuccess,
  searchPreviewFailure,
} from "../reducers/searchPreviewSlice";
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
import {
  getMusicsRequest,
  getMusicsSuccess,
  getMusicsFailure,
} from "../reducers/musicSlice";
import { occurError } from "../reducers/noticeSlice";

export function* handleMusicsSaga({ payload }) {
  try {
    const { data, message } = yield call(requestMusics, payload);

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

export function* handleSearchMusicSaga({ payload }) {
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

export function* handleSearchPreviewSaga({ payload }) {
  try {
    const { data, message } = yield call(requestSearchPreview, payload);

    if (data) {
      return yield put(searchPreviewSuccess(data));
    }

    yield put(searchPreviewFailure(message));
    yield put(occurError(message));
  } catch (err) {
    yield put(searchPreviewFailure(err.message));
    yield put(occurError(err.message));
  }
}

export function* handleGetCurrentMusicSaga({ payload }) {
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
    takeLatest(searchPreviewRequest.type, handleSearchPreviewSaga),
    takeLatest(searchMusicRequest.type, handleSearchMusicSaga),
    takeLatest(getCurrentMusicRequest.type, handleGetCurrentMusicSaga),
    takeLatest(getMusicsRequest.type, handleMusicsSaga),
  ]);
}
