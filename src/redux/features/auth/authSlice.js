import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    registerUser(state, action) {
      // Можно просто заглушку
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser, registerUser } = authSlice.actions;
export default authSlice.reducer;
