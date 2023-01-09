import { userReducer } from '../auth'
import { TAuthActions } from '../../types/auth'
import {
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  PATCH_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  CHECK_USER_AUTH
} from '../../actions/auth'
import { initialState } from '../auth'

describe('Redux auth store', () => {
  test('Should return the initial state', () => {
    expect(userReducer(undefined, {} as TAuthActions)).toEqual(initialState)
  })

  test("Should return state with 'loginRequest: true'", () => {
    expect(
      userReducer(initialState, {
        type: LOGIN_REQUEST
      })
    ).toEqual({
      ...initialState,
      loginRequest: true
    })
  })

  test('Should return state with user after rising login success action', () => {
    const user = {
      email: 'email',
      name: 'name'
    }
    expect(
      userReducer(initialState, {
        type: LOGIN_SUCCESS,
        payload: user
      })
    ).toEqual({
      ...initialState,
      user: user
    })
  })

  test('Should return state with error after rising login error action', () => {
    const error = 'Not found'
    expect(
      userReducer(initialState, {
        type: LOGIN_FAILED,
        payload: error
      })
    ).toEqual({
      ...initialState,
      loginError: error,
      loginFailed: true
    })
  })

  test("Should return state with 'registerRequest: true'", () => {
    expect(
      userReducer(initialState, {
        type: REGISTER_REQUEST
      })
    ).toEqual({
      ...initialState,
      registerRequest: true
    })
  })

  test('Should return state with user after rising register success action', () => {
    const user = {
      email: 'email',
      name: 'name'
    }
    expect(
      userReducer(initialState, {
        type: REGISTER_SUCCESS,
        payload: user
      })
    ).toEqual({
      ...initialState,
      user: user
    })
  })

  test('Should return state with error after rising register error action', () => {
    const error = 'Not found'
    expect(
      userReducer(initialState, {
        type: REGISTER_FAILED,
        payload: error
      })
    ).toEqual({
      ...initialState,
      registerError: error,
      registerFailed: true
    })
  })

  test("Should return state with 'getUserRequest: true'", () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_REQUEST
      })
    ).toEqual({
      ...initialState,
      getUserRequest: true
    })
  })

  test('Should return state with user after rising get user success action', () => {
    const user = {
      email: 'email',
      name: 'name'
    }
    expect(
      userReducer(initialState, {
        type: GET_USER_SUCCESS,
        payload: user
      })
    ).toEqual({
      ...initialState,
      user: user
    })
  })

  test('Should return state with error after rising get user error action', () => {
    const error = 'Not found'
    expect(
      userReducer(initialState, {
        type: GET_USER_FAILED,
        payload: error
      })
    ).toEqual({
      ...initialState,
      getUserError: error,
      getUserFailed: true
    })
  })

  test("Should return state with 'patchUserRequest: true'", () => {
    expect(
      userReducer(initialState, {
        type: PATCH_USER_REQUEST
      })
    ).toEqual({
      ...initialState,
      patchUserRequest: true
    })
  })

  test('Should return state with user after rising patch user success action', () => {
    const user = {
      email: 'email',
      name: 'name'
    }
    expect(
      userReducer(initialState, {
        type: PATCH_USER_SUCCESS,
        payload: user
      })
    ).toEqual({
      ...initialState,
      user: user
    })
  })

  test('Should return state with error after rising patch user error action', () => {
    const error = 'Not found'
    expect(
      userReducer(initialState, {
        type: PATCH_USER_FAILED,
        payload: error
      })
    ).toEqual({
      ...initialState,
      patchUserError: error,
      patchUserFailed: true
    })
  })

  test("Should return state with 'logoutRequest: true'", () => {
    expect(
      userReducer(initialState, {
        type: LOGOUT_REQUEST
      })
    ).toEqual({
      ...initialState,
      logoutRequest: true
    })
  })

  test('Should return state with user after rising logout success action', () => {
    expect(
      userReducer(initialState, {
        type: LOGOUT_SUCCESS
      })
    ).toEqual({
      ...initialState,
      user: null
    })
  })

  test('Should return state with error after rising logout error action', () => {
    const error = 'Not found'
    expect(
      userReducer(initialState, {
        type: LOGOUT_FAILED,
        payload: error
      })
    ).toEqual({
      ...initialState,
      logoutError: error,
      logoutFailed: true
    })
  })

  test("Should return state with 'isUserAuthChecked: true'", () => {
    expect(
      userReducer(initialState, {
        type: CHECK_USER_AUTH
      })
    ).toEqual({
      ...initialState,
      isUserAuthChecked: true
    })
  })
})
