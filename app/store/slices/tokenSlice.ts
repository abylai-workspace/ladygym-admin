// tokenSlice.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {removeBearerToken} from 'utils/axios';

const initialState = {
  accessToken: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: state => {
      state.accessToken = null;
      removeBearerToken();
    },
  },
});

export const {setAccessToken, clearAccessToken} = tokenSlice.actions;
export default tokenSlice.reducer;
