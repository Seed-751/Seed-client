import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

import musicReducer from "../../reducers/musicSlice";
import searchReducer from "../../reducers/searchSlice";
import searchPreviewReducer from "../../reducers/searchPreviewSlice";
import currentMusicReducer from "../../reducers/currentMusicSlice";
import {
  handleMusicsSaga,
  handleSearchMusicSaga,
  handleSearchPreviewSaga,
  handleGetCurrentMusicSaga,
} from "../../sagas/musicSaga";

import requestMusics from "../../api/requestMusics";
import requestSearchMusic from "../../api/requestSearchMusic";
import requestSearchPreview from "../../api/requestSearchPreview";
import requestCurrentMusic from "../../api/requestCurrentMusic";

import musicsData from "../mock/musicsData.json";
import searchData from "../mock/searchData.json";
import currentMusicData from "../mock/currentMusicData.json";

describe("Get musics in musicSaga test", () => {
  it("Get musics success => ", () => {
    const page = 1;

    const response = {
      success: true,
      data: musicsData,
    };

    return expectSaga(handleMusicsSaga, { payload: page })
      .withReducer(musicReducer)
      .provide([[call(requestMusics, page), response]])
      .put({ type: "music/getMusicsSuccess", payload: response.data })
      .hasFinalState({
        musics: response.data,
        isLoading: false,
        error: null,
      })
      .silentRun();
  });

  it("Get musics failure => ", () => {
    const page = 1;

    const response = {
      message: "요청에 실패하였습니다."
    };

    return expectSaga(handleMusicsSaga, { payload: page })
      .withReducer(musicReducer)
      .provide([[call(requestMusics, page), response]])
      .put({ type: "music/getMusicsFailure", payload: response.message })
      .hasFinalState({
        musics: [],
        isLoading: false,
        error: response.message,
      })
      .silentRun();
  });
});

describe("Search musics in musicSaga test", () => {
  it("Search musics success => ", () => {
    const keword = "Just";

    const response = {
      success: true,
      data: searchData,
    };

    return expectSaga(handleSearchMusicSaga, { payload: keword })
      .withReducer(searchReducer)
      .provide([[call(requestSearchMusic, keword), response]])
      .put({ type: "search/searchMusicSuccess", payload: response.data })
      .hasFinalState({
        searchResult: response.data,
        isLoading: false,
        error: null,
      })
      .silentRun();
  });

  it("Search musics failure => ", () => {
    const keword = "Just";

    const response = {
      message: "요청에 실패하였습니다."
    };

    return expectSaga(handleSearchMusicSaga, { payload: keword })
      .withReducer(searchReducer)
      .provide([[call(requestSearchMusic, keword), response]])
      .put({ type: "search/searchMusicFailure", payload: response.message })
      .hasFinalState({
        searchResult: {},
        isLoading: false,
        error: response.message,
      })
      .silentRun();
  });
});

describe("Search preview musics in musicSaga test", () => {
  it("Search preview musics success => ", () => {
    const keword = "Just";

    const response = {
      success: true,
      data: searchData,
    };

    return expectSaga(handleSearchPreviewSaga, { payload: keword })
      .withReducer(searchPreviewReducer)
      .provide([[call(requestSearchPreview, keword), response]])
      .put({ type: "searchPreview/searchPreviewSuccess", payload: response.data })
      .hasFinalState({
        searchPreviewResult: response.data,
        isLoading: false,
        error: null,
      })
      .silentRun();
  });

  it("Search preview musics failure => ", () => {
    const keword = "Just";

    const response = {
      message: "요청에 실패하였습니다."
    };

    return expectSaga(handleSearchPreviewSaga, { payload: keword })
      .withReducer(searchPreviewReducer)
      .provide([[call(requestSearchPreview, keword), response]])
      .put({ type: "searchPreview/searchPreviewFailure", payload: response.message })
      .hasFinalState({
        searchPreviewResult: {},
        isLoading: false,
        error: response.message,
      })
      .silentRun();
  });
});

describe("Get current music in musicSaga test", () => {
  it("Get current music success => ", () => {
    const musicId = "6173337b7a0e9fe7b7e20b97";

    const response = {
      success: true,
      data: currentMusicData,
    };

    return expectSaga(handleGetCurrentMusicSaga, { payload: musicId })
      .withReducer(currentMusicReducer)
      .provide([[call(requestCurrentMusic, musicId), response]])
      .put({ type: "currentMusic/getCurrentMusicSuccess", payload: response.data })
      .hasFinalState({
        music: response.data,
        isLoading: false,
        error: null,
        currentTrack: response.data.audios[0]
      })
      .silentRun();
  });

  it("Get current music failure => ", () => {
    const musicId = "6173337b7a0e9fe7b7e20b97";

    const response = {
      message: "요청에 실패하였습니다."
    };

    return expectSaga(handleGetCurrentMusicSaga, { payload: musicId })
      .withReducer(currentMusicReducer)
      .provide([[call(requestCurrentMusic, musicId), response]])
      .put({ type: "currentMusic/getCurrentMusicFailure", payload: response.message })
      .hasFinalState({
        music: null,
        isLoading: false,
        error: response.message,
        currentTrack: null,
      })
      .silentRun();
  });
});
