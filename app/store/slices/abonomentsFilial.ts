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
  gyms: [],
  status: 'idle',
  error: null,
};

export const fetchGymsFilial = createAsyncThunk<[GymsFilialState]>('gyms/filial', async () => {
  try {
    const response = await instance.get(`/gym/manage/all`, {
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

const gymFilal = createSlice({
  name: 'gymsfilial',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGymsFilial.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGymsFilial.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gyms = action.payload;
      })
      .addCase(fetchGymsFilial.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default gymFilal.reducer;
