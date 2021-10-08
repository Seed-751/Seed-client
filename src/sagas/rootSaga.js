import { all, fork } from "@redux-saga/core/effects";

import userSaga from "./userSaga";
import musicSaga from "./musicSaga";

export function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(musicSaga)
  ]);
}
