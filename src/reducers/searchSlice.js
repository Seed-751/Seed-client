import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResult: [],
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setInitiateSearchResult: () => {
      return initialState;
    },
    searchMusicRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    searchMusicSuccess: (state, action) => {
      state.isLoading = false;
      state.searchResult = action.payload;
      state.error = null;
    },
    searchMusicFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  searchMusicRequest,
  searchMusicSuccess,
  searchMusicFailure,
  setInitiateSearchResult,
} = searchSlice.actions;

export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
