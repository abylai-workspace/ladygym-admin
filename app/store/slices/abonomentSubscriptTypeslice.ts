// src/redux/gymSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOKEN_KEY } from 'constants/constants';
import { storageReadItem } from 'utils/asyncStorage';
import { instance } from 'utils/axios';


interface GymsFilialState {
  gyms: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
const initialState = {
  gymssubscriptype: [],
  status: 'idle',
  error: null,
};

export const fetchGymsSubscriptionsType = createAsyncThunk<any[]>('gyms/subscriptions', async () => {
  try {
    const response = await instance.get(`/gym/subscriptions/types`, {
      headers: {
        Authorization: `Bearer ${await storageReadItem(TOKEN_KEY)}`,
      },
    });
    const data:GymsFilialState[] = await response.data;
    return data;
  } catch (error) {
    throw error;
  }
});

const gymAbonomenType = createSlice({
  name: 'gymssubscriptype',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGymsSubscriptionsType.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGymsSubscriptionsType.fulfilled, (state:any, action) => {
        state.status = 'succeeded';
        state.gymssubscriptype = action.payload;
      })
      .addCase(fetchGymsSubscriptionsType.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default gymAbonomenType.reducer;
