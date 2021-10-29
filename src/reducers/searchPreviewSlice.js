import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchPreviewResult: [],
  isLoading: false,
  error: null,
};

const searchPreviewSlice = createSlice({
  name: "searchPreview",
  initialState,
  reducers: {
    setInitiateSearchPreviewResult: () => {
      return initialState;
    },
    searchPreviewRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    searchPreviewSuccess: (state, action) => {
      state.isLoading = false;
      state.searchPreviewResult = action.payload;
      state.error = null;
    },
    searchPreviewFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  searchPreviewRequest,
  searchPreviewSuccess,
  searchPreviewFailure,
  setInitiateSearchPreviewResult,
} = searchPreviewSlice.actions;

export const selectSearchPreview = (state) => state.searchPreview;

export default searchPreviewSlice.reducer;
