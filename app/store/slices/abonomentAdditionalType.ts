// src/redux/gymSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOKEN_KEY } from 'constants/constants';
import { storageReadItem } from 'utils/asyncStorage';
import { instance } from 'utils/axios';



const initialState = {
  subscriptionAdditional: [],
  status: 'idle',
  error: null,
};

export const fetchGymsSubscriptionAdditional = createAsyncThunk('subscriptions/additionalType', async () => {
  try {
    const response = await instance.get(`/gym/subscriptions/types/additional`, {
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

const subscriptionAdditional = createSlice({
  name: 'subscriptionAdditional',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGymsSubscriptionAdditional.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGymsSubscriptionAdditional.fulfilled, (state:any, action) => {
        state.status = 'succeeded';
        state.gyms = action.payload;
      })
      .addCase(fetchGymsSubscriptionAdditional.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default subscriptionAdditional.reducer;
