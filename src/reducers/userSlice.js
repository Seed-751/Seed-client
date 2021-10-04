import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isLoading: false,
  isLoggedIn: false,
  isSignupSuccess: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.isLoading = true;
    },
    signupSuccess: (state) => {
      state.isLoading = false;
      state.isSignupSuccess = true;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.isSignupSuccess = false;
      state.error = action.payload;
    },
    loginRequest: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.userInfo = { ...action.payload };
      state.isLoggedIn = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isSignupSuccess = false;
      state.error = action.payload;
    },
    authCheckRequest: (state) => {
      state.isLoading = true;
    },
    authCheckSuccess: (state, action) => {
      state.isLoading = false;
      state.userInfo = { ...action.payload };
      state.isLoggedIn = true;
      state.error = null;
    },
    authCheckFailure: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isSignupSuccess = false;
      state.error = action.payload;
    },
  },
});

export const {
  signupRequest,
  signupSuccess,
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  authCheckRequest,
  authCheckSuccess,
  authCheckFailure,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
