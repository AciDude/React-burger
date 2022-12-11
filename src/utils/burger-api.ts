import { saveTokens, getCookie, deleteCookie } from './cookies'
import {
  TIngredients,
  TLogin,
  TRegister,
  TPatch,
  TPasswordReset,
  TPasswordChange,
  CustomResponse,
  TResponseBody,
  TUser,
  TTokens,
  TOrderWithOwnerAndPrice,
  TOrder
} from './data-types'

export const BASE_WS_URL = 'wss://norma.nomoreparties.space/'
export const BASE_URL = 'https://norma.nomoreparties.space/api/'
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

const checkResponse = <T>(response: CustomResponse<T>) => {
  if (!response.ok) {
    if (response.status === 403)
      return response.json().then(err => Promise.reject(err))
    return Promise.reject(response.status)
  }
  return response.json()
}

export function request<T>(
  url: RequestInfo | URL,
  options?: RequestInit | undefined
) {
  return fetch(url, options)
    .then<TResponseBody<T>>(checkResponse)
    .then(res => (res?.success ? res : Promise.reject(res)))
}

export function refreshTokenApi() {
  return request<TTokens>(
    `${BASE_URL}auth/token`,
    setOptions('POST', defaultHeaders, {
      token: localStorage.getItem('refreshToken')
    })
  )
}

export async function requestWithRefresh<T>(
  url: RequestInfo | URL,
  options: RequestInit | undefined
): Promise<TResponseBody<T>> {
  try {
    return await request(url, options)
  } catch (err) {
    if ((err as TResponseBody)?.message === 'jwt expired') {
      console.log('REFRESH')
      const refreshData = await refreshTokenApi()
      const accessToken = refreshData.accessToken.split('Bearer ')[1]
      const refreshToken = refreshData.refreshToken
      saveTokens(refreshToken, accessToken)
      ;(options?.headers as Headers).set(
        'Authorization',
        `Bearer ${accessToken}`
      )
      console.log(options?.headers)

      return request(url, options)
    }
    deleteCookie('accessToken')
    localStorage.removeItem('refreshToken')
    return Promise.reject(err)
  }
}

export function getIngredientsAPI() {
  return request<{ readonly data: TIngredients }>(`${BASE_URL}ingredients`)
}

export function getOrderAPI(body: { ingredients: string[] }) {
  return requestWithRefresh<{
    readonly name: string
    readonly order: TOrderWithOwnerAndPrice
  }>(
    `${BASE_URL}orders`,
    setOptions(
      'POST',
      {
        ...defaultHeaders,
        Authorization: `Bearer ${getCookie('accessToken')}`
      },
      body
    )
  )
}

export function loginAPI(body: TLogin) {
  return request<TTokens & { readonly user: TUser }>(
    `${BASE_URL}auth/login`,
    setOptions('POST', defaultHeaders, body)
  )
}

export function registerAPI(body: TRegister) {
  return request<TTokens & { readonly user: TUser }>(
    `${BASE_URL}auth/register`,
    setOptions('POST', defaultHeaders, body)
  )
}

export function getUserAPI() {
  return requestWithRefresh<{ readonly user: TUser }>(
    `${BASE_URL}auth/user`,
    setOptions('GET', {
      ...defaultHeaders,
      Authorization: `Bearer ${getCookie('accessToken')}`
    })
  )
}

export function patchUserAPI(body: TPatch) {
  return requestWithRefresh<{ readonly user: TUser }>(
    `${BASE_URL}auth/user`,
    setOptions(
      'PATCH',
      {
        ...defaultHeaders,
        Authorization: `Bearer ${getCookie('accessToken')}`
      },
      body
    )
  )
}

export function logoutAPI() {
  deleteCookie('accessToken')
  localStorage.removeItem('refreshToken')
  return request(
    `${BASE_URL}auth/logout`,
    setOptions('POST', defaultHeaders, {
      token: localStorage.getItem('refreshToken')
    })
  )
}

export function passwordResetAPI(body: TPasswordReset) {
  return request(
    `${BASE_URL}password-reset`,
    setOptions('POST', defaultHeaders, body)
  )
}

export function passwordChangeAPI(body: TPasswordChange) {
  return request(
    `${BASE_URL}password-reset/reset`,
    setOptions('POST', defaultHeaders, body)
  )
}

export function getOrderByNumber(string: string) {
  return request<{
    readonly orders: ReadonlyArray<
      TOrder & { readonly __v: number; readonly owner: string }
    >
  }>(`${BASE_URL}orders/${string}`)
}
