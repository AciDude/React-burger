import {
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  CHECK_USER_AUTH,
  PATCH_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from '../actions/auth'
import { TUser } from '../../utils/data-types'

export type TLoginRequestAction = {
  readonly type: typeof LOGIN_REQUEST
}
export type TLoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS
  readonly payload: TUser
}
export type TLoginFailedAction = {
  readonly type: typeof LOGIN_FAILED
  readonly payload: string
}
export type TRegisterRequestAction = {
  readonly type: typeof REGISTER_REQUEST
}
export type TRegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS
  readonly payload: TUser
}
export type TRegisterFailedAction = {
  readonly type: typeof REGISTER_FAILED
  readonly payload: string
}
export type TGetUserRequestAction = {
  readonly type: typeof GET_USER_REQUEST
}
export type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS
  readonly payload: TUser
}
export type TGetUserFailedAction = {
  readonly type: typeof GET_USER_FAILED
  readonly payload: string
}
export type TPatchUserRequestAction = {
  readonly type: typeof PATCH_USER_REQUEST
}
export type TPatchUserSuccessAction = {
  readonly type: typeof PATCH_USER_SUCCESS
  readonly payload: TUser
}
export type TPatchUserFailedAction = {
  readonly type: typeof PATCH_USER_FAILED
  readonly payload: string
}
export type TLogoutUserRequestAction = {
  readonly type: typeof LOGOUT_REQUEST
}
export type TLogoutUserSuccessAction = {
  readonly type: typeof LOGOUT_SUCCESS
}
export type TLogoutUserFailedAction = {
  readonly type: typeof LOGOUT_FAILED
  readonly payload: string
}
export type TCheckUserAuthAction = {
  readonly type: typeof CHECK_USER_AUTH
}

export type TAuthActions =
  | TLoginRequestAction
  | TLoginSuccessAction
  | TLoginFailedAction
  | TRegisterRequestAction
  | TRegisterSuccessAction
  | TRegisterFailedAction
  | TGetUserRequestAction
  | TGetUserSuccessAction
  | TGetUserFailedAction
  | TPatchUserRequestAction
  | TPatchUserSuccessAction
  | TPatchUserFailedAction
  | TLogoutUserRequestAction
  | TLogoutUserSuccessAction
  | TLogoutUserFailedAction
  | TCheckUserAuthAction
