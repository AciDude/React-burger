import { saveTokens, getCookie } from './cookies'
import {
  TIngredients,
  TLogin,
  TRegister,
  TPatch,
  TPasswordReset,
  TPasswordChange
} from './types'

const BASE_URL = 'https://norma.nomoreparties.space/api/'
const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json;charset=utf-8'
}

const setOptions: (
  method?: string,
  headers?: HeadersInit,
  body?: any
) => RequestInit = (method = 'GET', headers = defaultHeaders, body) => ({
  method,
  headers,
  body: JSON.stringify(body)
})

const checkResponse = (response: Response) => {
  if (!response.ok) {
    if (response.status === 403)
      return response.json().then(err => Promise.reject(err))
    return Promise.reject(response.status)
  }
  return response.json()
}

export function request(
  url: RequestInfo | URL,
  options?: RequestInit | undefined
) {
  return fetch(url, options).then(checkResponse)
}

export function refreshTokenApi() {
  return request(
    `${BASE_URL}auth/token`,
    setOptions('POST', defaultHeaders, {
      token: localStorage.getItem('refreshToken')
    })
  ).then(res => (res?.success ? res : Promise.reject(res)))
}

export async function requestWithRefresh(
  url: RequestInfo | URL,
  options: RequestInit | undefined
) {
  try {
    return await request(url, options)
  } catch (err) {
    if (err instanceof Error && err.message === 'jwt expired') {
      const refreshData = await refreshTokenApi()
      const accessToken = refreshData.accessToken.split('Bearer ')[1]
      const refreshToken = refreshData.refreshToken
      saveTokens(refreshToken, accessToken)
      ;(options?.headers as Headers).set(
        'Authorization',
        `Bearer ${accessToken}`
      )
      return request(url, options)
    }
    return Promise.reject(err)
  }
}

export function getIngredientsAPI() {
  return request(`${BASE_URL}ingredients`).then(res =>
    res?.success ? res.data : Promise.reject(res)
  )
}

export function getOrderAPI(body: { ingredients: TIngredients }) {
  return requestWithRefresh(
    `${BASE_URL}orders`,
    setOptions(
      'POST',
      {
        ...defaultHeaders,
        Authorization: `Bearer ${getCookie('accessToken')}`
      },
      body
    )
  ).then(res => (res?.success ? res : Promise.reject(res)))
}

export function loginAPI(body: TLogin) {
  return request(
    `${BASE_URL}auth/login`,
    setOptions('POST', defaultHeaders, body)
  ).then(res => (res?.success ? res : Promise.reject(res)))
}

export function registerAPI(body: TRegister) {
  return request(
    `${BASE_URL}auth/register`,
    setOptions('POST', defaultHeaders, body)
  ).then(res => (res?.success ? res : Promise.reject(res)))
}

export function getUserAPI() {
  return requestWithRefresh(
    `${BASE_URL}auth/user`,
    setOptions('GET', {
      ...defaultHeaders,
      Authorization: `Bearer ${getCookie('accessToken')}`
    })
  ).then(res => (res?.success ? res : Promise.reject(res)))
}

export function patchUserAPI(body: TPatch) {
  return requestWithRefresh(
    `${BASE_URL}auth/user`,
    setOptions(
      'PATCH',
      {
        ...defaultHeaders,
        Authorization: `Bearer ${getCookie('accessToken')}`
      },
      body
    )
  ).then(res => (res?.success ? res : Promise.reject(res)))
}

export function logoutAPI() {
  return request(
    `${BASE_URL}auth/logout`,
    setOptions('POST', defaultHeaders, {
      token: localStorage.getItem('refreshToken')
    })
  ).then(res => (res?.success ? res : Promise.reject(res)))
}

export function passwordResetAPI(body: TPasswordReset) {
  return request(
    `${BASE_URL}password-reset`,
    setOptions('POST', defaultHeaders, body)
  ).then(res => (res?.success ? res : Promise.reject(res)))
}

export function passwordChangeAPI(body: TPasswordChange) {
  return request(
    `${BASE_URL}password-reset/reset`,
    setOptions('POST', defaultHeaders, body)
  ).then(res => (res?.success ? res : Promise.reject(res)))
}
