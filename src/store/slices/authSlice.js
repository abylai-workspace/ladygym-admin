// authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { decode as atob, encode as btoa } from "base-64";
import { useNavigate } from "react-router-dom";

export const loginUser = (values) => async (dispatch) => {
  try {
    const credentials = `${values.username}:${values.password}`;
    const base64Credentials = btoa(credentials);
    dispatch(loginStart());
    const response = await axios.post(
      "https://ladygymapp.kz:8443/gym/auth/login",
      null,
      {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data, "LLOGIN");
    dispatch(loginSuccess(response.data, "success"));
  } catch (error) {
    dispatch(loginFailure(error.message, "error"));
  }
};

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
