import axios, { AxiosError, AxiosResponse } from 'axios'

import { storageCreateOrUpdateItem, storageReadItem } from '../utils/asyncStorage'
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../constants/constants'

export const instance = axios.create({
  baseURL: 'https://ladygymapp.kz',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const addBearerToken = (token: string | undefined) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export const removeBearerToken = () => {
  delete instance.defaults.headers.common['Authorization']
}

export const get = async (
  key: string | string[],
  fn: (data: any) => void = () => {},
  fail: (error: AxiosError) => void = () => {},
) => {
  try {
    const route = typeof key === 'string' ? key : key.join('')
    const { data, status }: AxiosResponse = await instance.get(route)
    if (status < 300) {
      fn(data)
      return data
    } else {
      throw new Error('Request failed with status: ' + status)
    }
  } catch (error: any) {
    fail(error)
    return null
  }
}

export const post = async (
  route: string,
  body: any,
  fn: (data: any) => void = () => {},
  fail: (error: AxiosError) => void = () => {},
) => {
  try {
    const { data, status }: AxiosResponse = await instance.post(route, body)
    if (status < 300) {
      fn(data)
      return data
    } else {
      throw new Error('Request failed with status: ' + status)
    }
  } catch (error: any) {
    fail(error)
    return null
  }
}

export const put = async (
  route: string,
  body: any,
  fn: (data: any) => void = () => {},
  fail: (error: AxiosError) => void = () => {},
) => {
  try {
    const { data, status }: AxiosResponse = await instance.put(route, body)
    if (status < 300) {
      fn(data)
      return data
    } else {
      throw new Error('Request failed with status: ' + status)
    }
  } catch (error: any) {
    fail(error)
    return null
  }
}
export const login = async (phone:string, password:string,token:string) => {
  try {
    const response = await instance.post(`/gym/auth/login`, { phone, password },{
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if(response.status === 401){
      throw new Error('Login failed');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export  const register = async (values:any) => {
  try {
    const response = await instance.post('/gym/auth/registration', {
      ...values,
    });
    if (response.status === 200) {
      // Registration successful
      return response;
    } else {
      // Handle other response statuses if needed
      throw new Error('Registration failed');
    }
  } catch (error) {
    // Handle any network or other errors
    throw error;
  }
};
export const getUserInfo = async (values:any) => {
  try {
    const response = await instance.post('/gym/user/info/', {
      ...values,
    });
    if (response.status === 200) {
      console.log(response.data);
      return response;
    } else {
      // Handle other response statuses if needed
      throw new Error('Registration failed');
    }
  } catch (error) {
    // Handle any network or other errors
    throw error;
  }

}


export const saveAccessTokens = async (data: any) => {

  const jwt = data.data.accessToken
  const refreshToken = data.data.refreshToken
  if (jwt) {
    await storageCreateOrUpdateItem(TOKEN_KEY, jwt)
  }

  if (refreshToken) {
    await storageCreateOrUpdateItem(REFRESH_TOKEN_KEY, refreshToken)
    
  }
 console.log('saveAccessTokens', jwt, refreshToken)

}

async function refreshOldToken(
  route: string,
  body: any,
  fn: (data: any) => void = () => { },
  fail: (error: AxiosError) => void = () => { },
) {
  const token = await storageReadItem(REFRESH_TOKEN_KEY)
  const refreshURL = `${instance.post('/gym/auth/refresh')}`
//   await removeBearerToken(instance)
  // console.log('[post] refreshed request', refreshURL, instance.defaults.headers)
  const { data }: AxiosResponse = await instance.get(refreshURL, body)
  await storageCreateOrUpdateItem(TOKEN_KEY, data.accessToken)
  await storageCreateOrUpdateItem(REFRESH_TOKEN_KEY, data.refreshToken)
  // console.log('[post] refreshed result', data, status, statusText)
  return await post(route, body, fn, fail)
};

