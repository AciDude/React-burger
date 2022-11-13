import { BASE_URL } from '../../utils/base-url'
import { request } from '../../utils/request'
import { saveTokens, getCookie, deleteCookie } from '../../utils/auth'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'
export const CLEAR_USER_REQUEST = 'CLEAR_USER_REQUEST'
export const CLEAR_USER_SUCCESS = 'CLEAR_USER_SUCCESS'
export const CLEAR_USER_FAILED = 'CLEAR_USER_FAILED'

export const authUser = (endPoint, body) => dispatch => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body)
  }
  dispatch({
    type: GET_USER_REQUEST
  })
  request(`${BASE_URL}auth/${endPoint}`, options)
    .then(res => {
      const accessToken = res.accessToken.split('Bearer ')[1]
      const refreshToken = res.refreshToken
      saveTokens(refreshToken, accessToken)
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.user
      })
    })
    .catch(err =>
      dispatch({
        type: GET_USER_FAILED,
        payload: err.message
      })
    )
}

export const getUser =
  (body = '', method = 'GET') =>
  dispatch => {
    dispatch({
      type: GET_USER_REQUEST
    })
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('accessToken')
      }
    }
    if (body) options.body = JSON.stringify(body)
    request(`${BASE_URL}auth/user`, options)
      .then(res => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.user
        })
      })
      .catch(err => {
        if (err.message === 'jwt expired') {
          dispatch(refreshToken(getUser(body, method)))
        } else {
          console.log(1)
          dispatch({
            type: GET_USER_FAILED,
            payload: err.message
          })
        }
      })
  }

export const logoutUser = () => dispatch => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }
  dispatch({
    type: CLEAR_USER_REQUEST
  })
  request(`${BASE_URL}auth/logout`, options)
    .then(res => {
      deleteCookie('accessToken')
      localStorage.removeItem('refreshToken')
      dispatch({
        type: CLEAR_USER_SUCCESS
      })
    })
    .catch(err =>
      dispatch({
        type: CLEAR_USER_FAILED,
        payload: err.message
      })
    )
}

export const refreshToken = afterRefresh => dispatch => {
  request(`${BASE_URL}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then(res => {
    const accessToken = res.accessToken.split('Bearer ')[1]
    const refreshToken = res.refreshToken
    saveTokens(refreshToken, accessToken)
    dispatch(afterRefresh)
  })
}
