import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import trailsService from './trailsService';

const initialState = {
  trail: '',
  trails: [],
  distance: '',
  elevation: '',
  activity: '',
  difficulty: '',
  track: {},
  creator: '',
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

//Create trail
export const createTrail = createAsyncThunk(
  'trail/create',
  async (trailData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await trailsService.createTrail(trailData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Upload File
export const uploadFile = createAsyncThunk(
  'trail/create',
  async (formdata, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await trailsService.createTrail(formdata, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get all trails
export const getTrails = createAsyncThunk(
  'trail/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await trailsService.getTrails(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete trail
export const deleteTrail = createAsyncThunk(
  'trail/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await trailsService.deleteTrail(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const trailsSlice = createSlice({
  name: 'trail',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTrail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trails.push(action.payload);
      })
      .addCase(createTrail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTrails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trail = action.payload;
      })
      .addCase(getTrails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTrail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTrail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trail = state.trails.filter(
          (trail) => trail._id !== action.payload.id
        );
      })
      .addCase(deleteTrail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = trailsSlice.actions;
export default trailsSlice.reducer;
