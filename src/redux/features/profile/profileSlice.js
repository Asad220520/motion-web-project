// src/redux/slices/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../../../api/ProfileApi";

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { getState }) => {
    const state = getState();
    const accessToken = state.auth.tokens?.access;

    if (!accessToken) throw new Error("No access token");
    return await getUserProfile(accessToken);
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: { profile: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
