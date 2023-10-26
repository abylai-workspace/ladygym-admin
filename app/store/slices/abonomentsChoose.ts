// src/redux/gymSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOKEN_KEY } from 'constants/constants';
import { storageReadItem } from 'utils/asyncStorage';
import { instance } from 'utils/axios';



const initialState = {
  buyAbonoment: [],
  status: 'idle',
  error: null,
};

export const fetchGymsFilialAbonoments = createAsyncThunk('buy/abonoment', async () => {
  try {
    const response = await instance.get(`/gym/subscriptions/types/times`, {
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

const byAbonoments = createSlice({
  name: 'buyAbonoment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGymsFilialAbonoments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGymsFilialAbonoments.fulfilled, (state:any, action) => {
        state.status = 'succeeded';
        state.gyms = action.payload;
      })
      .addCase(fetchGymsFilialAbonoments.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default byAbonoments.reducer;
