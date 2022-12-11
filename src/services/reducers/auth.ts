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
  CHECK_USER_AUTH,
  TAuthActions
} from '../actions/auth'
import { TUser } from '../../utils/data-types'

export type TAuthState = {
  readonly user: TUser | null

  loginRequest: boolean
  loginFailed: boolean
  loginError: string | undefined

  registerRequest: boolean
  registerFailed: boolean
  registerError: string | undefined

  getUserRequest: boolean
  getUserFailed: boolean
  getUserError: string | undefined

  patchUserRequest: boolean
  patchUserFailed: boolean
  patchUserError: string | undefined

  logoutRequest: boolean
  logoutFailed: boolean
  logoutError: string | undefined

  isUserAuthChecked: boolean
}

const initialState: TAuthState = {
  user: null,

  loginRequest: false,
  loginFailed: false,
  loginError: undefined,

  registerRequest: false,
  registerFailed: false,
  registerError: undefined,

  getUserRequest: false,
  getUserFailed: false,
  getUserError: undefined,

  patchUserRequest: false,
  patchUserFailed: false,
  patchUserError: undefined,

  logoutRequest: false,
  logoutFailed: false,
  logoutError: undefined,

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
        loginError: undefined
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loginRequest: false,
        loginFailed: false,
        loginError: undefined
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
        registerError: undefined
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        registerRequest: false,
        registerFailed: false,
        registerError: undefined
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
        getUserError: undefined
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        getUserRequest: false,
        getUserFailed: false,
        getUserError: undefined
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
        patchUserError: undefined
      }
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        patchUserRequest: false,
        patchUserFailed: false,
        patchUserError: undefined
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
        logoutError: undefined
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        logoutRequest: false,
        logoutFailed: false,
        logoutError: undefined
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
