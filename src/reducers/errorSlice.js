import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  isError: false,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    occurError: (state, action) => {
      state.message = action.payload;
      state.isError = true;
    },
    confirmError: (state) => {
      state.message = null;
      state.isError = false;
    },
  },
});

export const {
  occurError,
  confirmError,
} = errorSlice.actions;

export const selectError = (state) => state.error;

export default errorSlice.reducer;
