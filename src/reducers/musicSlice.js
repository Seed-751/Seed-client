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
    },
    getMusicsSuccess: (state, action) => {
      state.isLoading = false;
      state.musics = action.payload;
      state.error = null;
    },
    getMusicsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getMusicsRequest,
  getMusicsSuccess,
  getMusicsFailure,
} = musicSlice.actions;

export const selectMusic = (state) => state.music;

export default musicSlice.reducer;
