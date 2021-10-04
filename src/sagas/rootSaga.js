import { all, fork } from "@redux-saga/core/effects";

import userSaga from "./userSaga";

export function* rootSaga() {
  yield all([
    fork(userSaga)
  ]);
}
