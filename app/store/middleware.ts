import {createListenerMiddleware} from '@reduxjs/toolkit';

import axios from 'axios';
import {instance} from 'utils/axios';
import {logout, refreshTokens} from './actions/auth';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: () => true,
  effect: (_, listenerApi) => {
    const {dispatch, getState} = listenerApi;
    // @ts-ignore
    instance.interceptors.request.use(async config => {
      // @ts-ignore
      return getState().authSlice.tokens.accessToken
        ? {
            ...config,
            headers: {
              Authorization:
                // @ts-ignore
                'Bearer ' + getState().authSlice.tokens.accessToken,
              'Accept-Language': 'ru',
            },
          }
        : Promise.reject('ErrorMessage.NO_ACCESS_TOKEN_PROVIDED');
    });
    instance.interceptors.response.use(
      data => data,
      err => {
        const requestConfig = err.config;
        const {status} = err.response;

        if (status === 401) {
          return axios
            .post(
              'https://ladygymapp.kz/gym/auth/refresh',
              {},
              {
                headers: {
                  Authorization: `Bearer ${
                    //@ts-ignore
                    getState().authSlice.tokens.refreshToken
                  }`,
                },
              },
            )
            .then(resp => {
              dispatch(refreshTokens(resp.data));
              instance(requestConfig);
            })
            .catch(err => {
              console.log('err', err);
              dispatch(logout());
            });
        }
        return Promise.reject(err);
      },
    );
    listenerApi.unsubscribe();
  },
});
