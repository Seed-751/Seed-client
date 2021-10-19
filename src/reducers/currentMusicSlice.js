import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  music: null,
  currentTrack: null,
  isLoading: false,
  error: null,
};

const currentMusicSlice = createSlice({
  name: "currentMusic",
  initialState,
  reducers: {
    initiateCurrentMusic: () => {
      return initialState;
    },
    getCurrentMusicRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getCurrentMusicSuccess: (state, action) => {
      state.isLoading = false;
      state.music = action.payload;
      state.currentTrack = action.payload.audios[0];
      state.error = null;
    },
    getCurrentMusicFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
  },
});

export const {
  getCurrentMusicRequest,
  getCurrentMusicSuccess,
  getCurrentMusicFailure,
  initiateCurrentMusic,
  setCurrentTrack,
} = currentMusicSlice.actions;

export const selectCurrentMusic = (state) => state.currentMusic;

export default currentMusicSlice.reducer;
