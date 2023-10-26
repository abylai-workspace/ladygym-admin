import axios, { AxiosError, AxiosResponse } from 'axios'

import { storageCreateOrUpdateItem, storageReadItem } from './asyncStorage'
import { REFRESH_TOKEN_KEY, ROLE, TOKEN_KEY } from 'constants/constants'

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
  fn: (data: any) => void = () => { },
  fail: (error: AxiosError) => void = () => { },
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
  fn: (data: any) => void = () => { },
  fail: (error: AxiosError) => void = () => { },
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
  fn: (data: any) => void = () => { },
  fail: (error: AxiosError) => void = () => { },
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
export const login = async (phone, password, token) => {
  try {
    const response = await instance.post(`/gym/auth/login`, { phone, password }, {
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      throw new Error('Login failed');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (values) => {
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
export const getUserInfo = async (values) => {
  try {
    const response = await instance.post('/gym/user/info/', {
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

}

export const getUserAndDocuments = async (token) => {
  try {
    const response = await instance.get('/gym/user/info', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      return response
    })
    return response
  } catch (error) {
    console.log(error)

  }

}

export const saveAccessTokens = async (data: any) => {

  const jwt = data.data.accessToken
  const role = data.data.role
  const refreshToken = data.data.refreshToken
  console.log('saveAccessTokens', jwt, role)
  if (jwt) {
    await storageCreateOrUpdateItem(TOKEN_KEY, jwt)
  }
  if (role) {
    await storageCreateOrUpdateItem(ROLE, role)
  }

  if (refreshToken) {
    await storageCreateOrUpdateItem(REFRESH_TOKEN_KEY, refreshToken)

  }
  //  console.log('saveAccessTokens', jwt, refreshToken)

}




export const getAllClients = async (token: any) => {
  try {
    const response = instance.get('/gym/user/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response

  } catch (error: any) {
    throw new Error(error)

  }
}


export const getAllPersonals = async (token: any) => {
  try {
    const response = instance.get('/gym/user/personal', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response

  } catch (error: any) {
    throw new Error(error)

  }
}

// "firstName": "Islam",
// "lastName": "Zavotpayev",
// "email": "elat@mail.ru",
// "phoneNumber": "77756830757",
// "password": "123",
// "role": "TRAINER",
// "gymId":"1"

export const createUserAndPersonal = async (token: any, data: any) => {
  try {
    const response = instance.post('/gym/user/create', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response

  } catch (error: any) {
    throw new Error(error)

  }


}
export const gymTrainers = async (token: any) => {
  try {
    const response = instance.get('/gym/user/trainers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response

  } catch (error: any) {
    throw new Error(error)

  }
}

export const VisitCounterClients = async (token: any) => {
  try {
    const response = instance.get('/gym/subscriptions/manage/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response

  } catch (error: any) {
    throw new Error(error)

  }
}
export const createUser = (firstName: string, lastName: string, password: string, phoneNumber: string) => {
  try {
    const response = instance.post('/gym/auth/registration', {
      firstName,
      lastName,
      password,
      phoneNumber,
    })

    return response

  } catch (error) {
    console.log(error)

  }

}

export const gymManageAll = () => {
  try {
    const response = instance.get('/gym/manage/all')
    return response

  } catch (error) {
    console.log(error)

  }

}

export const getFreezeAll = async (token: string) => {
  try {
    const response = await instance.get('/gym/subscriptions/freeze/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response

  } catch (error) {

  }

}

export const deletePersonal = async (token: string, id: string) => {
  try {
    const response = await instance.delete(`/gym/user/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response

  } catch (error) {

  }
}

export const updatePersonal = async (token: string, id: string, data: any) => {
  try {
    const response = await instance.post(`/gym/user/edit/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response

  } catch (error) {

  }
}

export const getTasksListMy = async (token: string) => {
  try {
    const response = await instance.get('/gym/tasks/my', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response

  } catch (error) {

  }
}

