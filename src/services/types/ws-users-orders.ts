import {
  WS_CONNECT_USERS_ORDERS,
  WS_DISCONNECT_USERS_ORDERS,
  WS_CONNECTION_START_USERS_ORDERS,
  WS_CONNECTION_SUCCESS_USERS_ORDERS,
  WS_CONNECTION_ERROR_USERS_ORDERS,
  WS_CONNECTION_CLOSED_USERS_ORDERS,
  WS_GET_MESSAGE_USERS_ORDERS
} from '../actions/ws-users-orders'
import { TWSResponse } from '../../utils/data-types'

export type TConnectUsersOrdersAction = {
  readonly type: typeof WS_CONNECT_USERS_ORDERS
  readonly payload: string
}
export type TDisconnectUsersOrdersAction = {
  readonly type: typeof WS_DISCONNECT_USERS_ORDERS
}
export type TWsConnectingUsersOrdersAction = {
  readonly type: typeof WS_CONNECTION_START_USERS_ORDERS
}
export type TWsOpenUsersOrdersAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS_USERS_ORDERS
}
export type TWsErrorUsersOrdersAction = {
  readonly type: typeof WS_CONNECTION_ERROR_USERS_ORDERS
}
export type TWsCloseUsersOrdersAction = {
  readonly type: typeof WS_CONNECTION_CLOSED_USERS_ORDERS
}
export type TWsMessageUsersOrdersAction = {
  readonly type: typeof WS_GET_MESSAGE_USERS_ORDERS
  readonly payload: TWSResponse
}

export type TWsUsersOrdersActions =
  | TConnectUsersOrdersAction
  | TDisconnectUsersOrdersAction
  | TWsConnectingUsersOrdersAction
  | TWsOpenUsersOrdersAction
  | TWsErrorUsersOrdersAction
  | TWsCloseUsersOrdersAction
  | TWsMessageUsersOrdersAction
