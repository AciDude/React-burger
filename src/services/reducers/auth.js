import {
  GET_USER_REQUEST,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  CLEAR_USER_FAILED,
  CLEAR_USER_REQUEST,
  CLEAR_USER_SUCCESS
} from '../actions/auth'

const initialState = {
  user: null,
  userRequest: false,
  userFailed: false,
  error: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        error: null
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        userRequest: false,
        userFailed: false,
        error: null
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
        error: action.payload,
        user: null
      }
    }
    case CLEAR_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        error: null
      }
    }
    case CLEAR_USER_SUCCESS: {
      return {
        ...state,
        user: null,
        userRequest: false,
        userFailed: false,
        error: null
      }
    }
    case CLEAR_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
        error: action.payload
      }
    }
    default: {
      return state
    }
  }
}
