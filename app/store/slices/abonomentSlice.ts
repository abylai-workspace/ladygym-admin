// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOKEN_KEY } from 'constants/constants';
import { storageReadItem } from 'utils/asyncStorage';
import { instance } from 'utils/axios';

// Define an async thunk to fetch data with the token
export const fetchData = createAsyncThunk('data/fetchData', async (_, { getState }) => {
 

  try {
    const response = await instance.get(`/gym/subscriptions/users`, {
      headers: {
        Authorization: `Bearer ${await storageReadItem(TOKEN_KEY)}`,
      },
    })
    if (!response.data) {
      throw new Error('Network response was not ok');
    }

    const data = await response.data;
    return data;
  } catch (error) {
    throw error;
  }
});

const abonomentSlice = createSlice({
  name: 'abomonents',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state:any, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export const selectData = (state) => state.data.data;
export const selectDataLoading = (state) => state.data.isLoading;
export const selectDataError = (state) => state.data.error;

export default abonomentSlice.reducer;
