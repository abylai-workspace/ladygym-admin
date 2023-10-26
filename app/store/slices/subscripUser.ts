// src/redux/gymSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOKEN_KEY } from 'constants/constants';
import { useSelector } from 'react-redux';
import { storageReadItem } from 'utils/asyncStorage';
import { instance } from 'utils/axios';




const initialState = {
    subscripUser: [],
  status: 'idle',
  error: null,
};
export const fetchSubscripUser = createAsyncThunk('subscripUser/subscripUser', async () => {
  try {
    const response = await instance.get(`/gym/subscriptions/users`, {
      headers: {
        Authorization: `Bearer ${await storageReadItem(TOKEN_KEY)}`,
      },
    });
    const data= await response.data;
    return data;
  } catch (error) {
    throw error;
  }
});

const subscripUser = createSlice({
  name: 'subscripUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscripUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscripUser.fulfilled, (state:any, action) => {
        state.status = 'succeeded';
        state.gyms = action.payload;
      })
      .addCase(fetchSubscripUser.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default subscripUser.reducer;
