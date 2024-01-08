// authSlice.js

import {createSlice} from '@reduxjs/toolkit';
import {getTokenStorage, login, logout, refreshTokens} from 'store/actions/auth';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  tokens: {accessToken: null, refreshToken: null, role: null},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, {payload}) => {
        state.tokens = payload;
      })
      .addCase(login.rejected, state => {
        state.tokens = {accessToken: null, refreshToken: null, role: null};
      })
      .addCase(refreshTokens.fulfilled, (state, {payload}) => {
        state.tokens = {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          role: state.tokens.role,
        };
      })
      .addCase(getTokenStorage.fulfilled, (state, {payload}) => {
        state.tokens = {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          role: payload.role,
        };
      })
      .addCase(logout.fulfilled, (state, {payload}) => {
        state.tokens = {accessToken: null, refreshToken: null, role: null};
      });
  },
});

export default authSlice.reducer;
