// src/redux/slices/coursesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '../../../config/api';

const API_URL = `${API_BASE_URL}/courses/`;

// Async action
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [],
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default coursesSlice.reducer;
