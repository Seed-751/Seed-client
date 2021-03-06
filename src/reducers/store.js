import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";

import { rootSaga } from "../sagas/rootSaga";

import userReducer from "./userSlice";
import noticeReducer from "./noticeSlice";
import searchPreviewReducer from "./searchPreviewSlice";
import searchReducer from "./searchSlice";
import musicRreducer from "./musicSlice";
import currentMusicReducer from "./currentMusicSlice";

const sagaMiddleware = createSagaMiddleware();

const middleware = process.env.NODE_ENV === "development"
  ? [logger, sagaMiddleware]
  : (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware);

const store = configureStore({
  reducer: {
    user: userReducer,
    notice: noticeReducer,
    searchPreview: searchPreviewReducer,
    search: searchReducer,
    music: musicRreducer,
    currentMusic: currentMusicReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
