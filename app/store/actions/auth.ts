import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {encode as btoa} from 'base-64';

const saveToken = (token: any) => AsyncStorage.setItem('@token', JSON.stringify(token));

const removeToken = () => AsyncStorage.removeItem('@token');

export const login = createAsyncThunk<any, any>(
  'auth/login',
  (userData: {phone: string; password: string}) => {
    const token = btoa(`${userData.phone}:${userData.password}`);
    return axios
      .post(
        `https://ladygymapp.kz/gym/auth/login`,
        {},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
      )
      .then((resp: any) => {
        saveToken({
          accessToken: resp.data.accessToken,
          refreshToken: resp.data.refreshToken,
          role: resp.data?.role,
        });
        const {accessToken, refreshToken, role} = resp.data;
        return {
          accessToken,
          refreshToken,
          role,
        };
      })
      .catch(err => {
        console.log('err', err);
      });
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await removeToken();
  return {accessToken: null, refreshToken: null};
});

export const refreshTokens = createAsyncThunk(
  'auth/refreshTokens/noLoading',
  (updatedTokens: any) => {
    saveToken({
      accessToken: updatedTokens.accessToken,
      refreshToken: updatedTokens.refreshToken,
    });
    return {
      accessToken: updatedTokens.accessToken,
      refreshToken: updatedTokens.refreshToken,
    };
  },
);

export const getTokenStorage = createAsyncThunk<any, void, {rejectValue: any}>(
  'GET_TOKEN_STORAGE',
  async (_, {rejectWithValue}) => {
    try {
      const tokenString = await AsyncStorage.getItem('@token');
      console.log('tokenString', tokenString);

      return tokenString ? JSON.parse(tokenString) : {accessToken: null, refreshToken: null};
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);
