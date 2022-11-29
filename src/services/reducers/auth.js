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

const initialState = {
  user: null,

  loginRequest: false,
  loginFailed: false,
  loginError: null,

  registerRequest: false,
  registerFailed: false,
  registerError: null,

  getUserRequest: false,
  getUserFailed: false,
  getUserError: null,

  patchUserRequest: false,
  patchUserFailed: false,
  patchUserError: null,

  logoutRequest: false,
  logoutFailed: false,
  logoutError: null,

  isUserAuthChecked: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //LOGIN
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginError: null
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loginRequest: false,
        loginFailed: false,
        loginError: null
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
        registerError: null
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        registerRequest: false,
        registerFailed: false,
        registerError: null
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
        getUserError: null
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        getUserRequest: false,
        getUserFailed: false,
        getUserError: null
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
        getUserError: action.payload
      }
    }
    //PATCH USER
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchUserRequest: true,
        patchUserError: null
      }
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        patchUserRequest: false,
        patchUserFailed: false,
        patchUserError: null
      }
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: true,
        patchUserError: action.payload
      }
    }
    //LOGOUT
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutError: null
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        logoutRequest: false,
        logoutFailed: false,
        logoutError: null
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
        logoutError: action.payload
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
