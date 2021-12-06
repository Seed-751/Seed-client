import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  musics: [],
  isLoading: false,
  error: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    getMusicsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getMusicsSuccess: (state, action) => {
      state.isLoading = false;
      state.musics = [...state.musics, ...action.payload];
      state.error = null;
    },
    getMusicsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    initiateMusics: () => {
      return initialState;
    },
  },
});

export const {
  getMusicsRequest,
  getMusicsSuccess,
  getMusicsFailure,
  initiateMusics,
} = musicSlice.actions;

export const selectMusic = (state) => state.music;

export default musicSlice.reducer;
