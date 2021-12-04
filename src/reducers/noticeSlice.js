import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  message: null,
  isOpen: false,
};

const notice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    occurError: (state, action) => {
      state.type = "error";
      state.message = action.payload;
      state.isOpen = true;
    },
    occurNotice: (state, action) => {
      state.type = "notice";
      state.message = action.payload;
      state.isOpen = true;
    },
    confirm: (state) => {
      state.type = null;
      state.message = null;
      state.isOpen = false;
    },
  },
});

export const {
  occurError,
  occurNotice,
  confirm,
} = notice.actions;

export const selectNotice = (state) => state.notice;

export default notice.reducer;
