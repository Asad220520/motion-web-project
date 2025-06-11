// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  tokens: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.tokens = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
