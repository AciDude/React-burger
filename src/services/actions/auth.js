import {
  loginAPI,
  logoutAPI,
  getUserAPI,
  patchUserAPI,
  registerAPI
} from '../../utils/burger-api'
import { saveTokens, getCookie, deleteCookie } from '../../utils/cookies'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST'
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS'
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

export const CHECK_USER_AUTH = 'CHECK_USER_AUTH'

export const loginUser = body => dispatch => {
  dispatch({
    type: LOGIN_REQUEST
  })
  loginAPI(body)
    .then(res => {
      const accessToken = res.accessToken.split('Bearer ')[1]
      const refreshToken = res.refreshToken
      saveTokens(refreshToken, accessToken)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.user
      })
    })
    .catch(err =>
      dispatch({
        type: LOGIN_FAILED,
        payload: err.message
      })
    )
}

export const registerUser = body => dispatch => {
  dispatch({
    type: REGISTER_REQUEST
  })
  registerAPI(body)
    .then(res => {
      const accessToken = res.accessToken.split('Bearer ')[1]
      const refreshToken = res.refreshToken
      saveTokens(refreshToken, accessToken)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.user
      })
    })
    .catch(err =>
      dispatch({
        type: REGISTER_FAILED,
        payload: err.message
      })
    )
}

export const getUser = () => (dispatch, getState) => {
  dispatch({
    type: GET_USER_REQUEST
  })
  getUserAPI()
    .then(res => {
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
    .finally(() => {
      !getState().auth.isUserAuthChecked && dispatch({ type: CHECK_USER_AUTH })
    })
}

export const patchUser = body => dispatch => {
  dispatch({
    type: PATCH_USER_REQUEST
  })
  patchUserAPI(body)
    .then(res => {
      dispatch({
        type: PATCH_USER_SUCCESS,
        payload: res.user
      })
    })
    .catch(err =>
      dispatch({
        type: PATCH_USER_FAILED,
        payload: err.message
      })
    )
}

export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_REQUEST
  })
  logoutAPI()
    .then(res => {
      deleteCookie('accessToken')
      localStorage.removeItem('refreshToken')
      dispatch({
        type: LOGOUT_SUCCESS
      })
    })
    .catch(err =>
      dispatch({
        type: LOGOUT_FAILED,
        payload: err.message
      })
    )
}

export const checkUserAuth = () => dispatch => {
  const accessToken = getCookie('accessToken')
  if (accessToken) return dispatch(getUser())
  dispatch({ type: CHECK_USER_AUTH })
}
