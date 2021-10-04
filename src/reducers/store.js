import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";

import { rootSaga } from "../sagas/rootSaga";

import userReducer from "./userSlice";

const sagaMiddleware = createSagaMiddleware();

const middleware = process.env.NODE_ENV === "development"
  ? [logger, sagaMiddleware]
  : (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware);

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
