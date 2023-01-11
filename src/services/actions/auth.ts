import {
  loginAPI,
  logoutAPI,
  getUserAPI,
  patchUserAPI,
  registerAPI
} from '../../utils/burger-api'
import { saveTokens, getCookie, deleteCookie } from '../../utils/cookies'
import { AppThunk } from '../types'
import { TLogin, TRegister, TPatch, TUser } from '../../utils/data-types'
import {
  TLoginRequestAction,
  TCheckUserAuthAction,
  TGetUserFailedAction,
  TGetUserRequestAction,
  TGetUserSuccessAction,
  TLoginFailedAction,
  TLoginSuccessAction,
  TLogoutUserFailedAction,
  TLogoutUserRequestAction,
  TLogoutUserSuccessAction,
  TPatchUserFailedAction,
  TPatchUserRequestAction,
  TPatchUserSuccessAction,
  TRegisterFailedAction,
  TRegisterRequestAction,
  TRegisterSuccessAction
} from '../types/auth'

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

export const loginRequest = (): TLoginRequestAction => ({
  type: LOGIN_REQUEST
})
export const loginSuccess = (payload: TUser): TLoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload
})
export const loginFailed = (payload: string): TLoginFailedAction => ({
  type: LOGIN_FAILED,
  payload
})
export const registerRequest = (): TRegisterRequestAction => ({
  type: REGISTER_REQUEST
})
export const registerSuccess = (payload: TUser): TRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload
})
export const registerFailed = (payload: string): TRegisterFailedAction => ({
  type: REGISTER_FAILED,
  payload
})
export const getUserRequest = (): TGetUserRequestAction => ({
  type: GET_USER_REQUEST
})
export const getUserSuccess = (payload: TUser): TGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  payload
})
export const getUserFailed = (payload: string): TGetUserFailedAction => ({
  type: GET_USER_FAILED,
  payload
})
export const patchUserRequest = (): TPatchUserRequestAction => ({
  type: PATCH_USER_REQUEST
})
export const patchUserSuccess = (payload: TUser): TPatchUserSuccessAction => ({
  type: PATCH_USER_SUCCESS,
  payload
})
export const patchUserFailed = (payload: string): TPatchUserFailedAction => ({
  type: PATCH_USER_FAILED,
  payload
})
export const logoutRequest = (): TLogoutUserRequestAction => ({
  type: LOGOUT_REQUEST
})
export const logoutSuccess = (): TLogoutUserSuccessAction => ({
  type: LOGOUT_SUCCESS
})
export const logoutFailed = (payload: string): TLogoutUserFailedAction => ({
  type: LOGOUT_FAILED,
  payload
})
export const checkUserAuth = (): TCheckUserAuthAction => ({
  type: CHECK_USER_AUTH
})

export const loginUser =
  (body: TLogin): AppThunk =>
  dispatch => {
    dispatch(loginRequest())
    return loginAPI(body)
      .then(res => {
        const accessToken = res.accessToken.split('Bearer ')[1]
        const refreshToken = res.refreshToken
        saveTokens(refreshToken, accessToken)
        dispatch(loginSuccess(res.user))
      })
      .catch(err => dispatch(loginFailed(err.message)))
  }

export const registerUser =
  (body: TRegister): AppThunk =>
  dispatch => {
    dispatch(registerRequest())
    return registerAPI(body)
      .then(res => {
        const accessToken = res.accessToken.split('Bearer ')[1]
        const refreshToken = res.refreshToken
        saveTokens(refreshToken, accessToken)
        dispatch(registerSuccess(res.user))
      })
      .catch(err => dispatch(registerFailed(err.message)))
  }

export const getUser = (): AppThunk => (dispatch, getState) => {
  dispatch(getUserRequest())
  return getUserAPI()
    .then(res => {
      dispatch(getUserSuccess(res.user))
    })
    .catch(err => dispatch(getUserFailed(err.message)))
    .finally(() => {
      !getState().auth.isUserAuthChecked && dispatch(checkUserAuth())
    })
}

export const patchUser =
  (body: TPatch): AppThunk =>
  dispatch => {
    dispatch(patchUserRequest())
    return patchUserAPI(body)
      .then(res => {
        dispatch(patchUserSuccess(res.user))
      })
      .catch(err => dispatch(patchUserFailed(err.message)))
  }

export const logoutUser = (): AppThunk => dispatch => {
  dispatch(logoutRequest())
  return logoutAPI()
    .then(res => {
      deleteCookie('accessToken')
      localStorage.removeItem('refreshToken')
      dispatch(logoutSuccess())
    })
    .catch(err => dispatch(logoutFailed(err.message)))
}

export const checkAuth = (): AppThunk => dispatch => {
  const accessToken = getCookie('accessToken')
  if (accessToken) return dispatch(getUser())
  dispatch(checkUserAuth())
}
