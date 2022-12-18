import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  CHECK_USER_AUTH
} from '../actions/auth'
import { TUser } from '../../utils/data-types'
import { TAuthActions } from '../types/auth'

export type TAuthState = {
  readonly user: TUser | null

  readonly loginRequest: boolean
  readonly loginFailed: boolean
  readonly loginError: string

  readonly registerRequest: boolean
  readonly registerFailed: boolean
  readonly registerError: string

  readonly getUserRequest: boolean
  readonly getUserFailed: boolean
  readonly getUserError: string

  readonly patchUserRequest: boolean
  readonly patchUserFailed: boolean
  readonly patchUserError: string

  readonly logoutRequest: boolean
  readonly logoutFailed: boolean
  readonly logoutError: string

  readonly isUserAuthChecked: boolean
}

const initialState: TAuthState = {
  user: null,

  loginRequest: false,
  loginFailed: false,
  loginError: '',

  registerRequest: false,
  registerFailed: false,
  registerError: '',

  getUserRequest: false,
  getUserFailed: false,
  getUserError: '',

  patchUserRequest: false,
  patchUserFailed: false,
  patchUserError: '',

  logoutRequest: false,
  logoutFailed: false,
  logoutError: '',

  isUserAuthChecked: false
}

export const userReducer = (
  state: TAuthState = initialState,
  action: TAuthActions
): TAuthState => {
  switch (action.type) {
    //LOGIN
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginError: ''
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loginRequest: false,
        loginFailed: false,
        loginError: ''
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
        loginError: action.payload
      }
    }
    //REGISTER
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerError: ''
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        registerRequest: false,
        registerFailed: false,
        registerError: ''
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
        registerError: action.payload
      }
    }
    //GET USER
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserError: ''
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        getUserRequest: false,
        getUserFailed: false,
        getUserError: ''
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
        getUserError: action.payload,
        user: null
      }
    }
    //PATCH USER
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchUserRequest: true,
        patchUserError: ''
      }
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        patchUserRequest: false,
        patchUserFailed: false,
        patchUserError: ''
      }
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: true,
        patchUserError: action.payload,
        user: null
      }
    }
    //LOGOUT
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutError: ''
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        logoutRequest: false,
        logoutFailed: false,
        logoutError: ''
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
        logoutError: action.payload,
        user: null
      }
    }
    //CHECK AUTH
    case CHECK_USER_AUTH: {
      return {
        ...state,
        isUserAuthChecked: true
      }
    }
    default: {
      return state
    }
  }
}
