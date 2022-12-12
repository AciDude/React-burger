import {
  WS_CONNECT_ALL_ORDERS,
  WS_DISCONNECT_ALL_ORDERS,
  WS_CONNECTION_START_ALL_ORDERS,
  WS_CONNECTION_SUCCESS_ALL_ORDERS,
  WS_CONNECTION_ERROR_ALL_ORDERS,
  WS_CONNECTION_CLOSED_ALL_ORDERS,
  WS_GET_MESSAGE_ALL_ORDERS
} from '../actions/ws-all-orders'
import { TWSResponse } from '../../utils/data-types'

export type TConnectAllOrdersAction = {
  readonly type: typeof WS_CONNECT_ALL_ORDERS
  readonly payload: string
}
export type TDisconnectAllOrdersAction = {
  readonly type: typeof WS_DISCONNECT_ALL_ORDERS
}
export type TWsConnectingAllOrdersAction = {
  readonly type: typeof WS_CONNECTION_START_ALL_ORDERS
}
export type TWsOpenAllOrdersAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS_ALL_ORDERS
}
export type TWsErrorAllOrdersAction = {
  readonly type: typeof WS_CONNECTION_ERROR_ALL_ORDERS
}
export type TWsCloseAllOrdersAction = {
  readonly type: typeof WS_CONNECTION_CLOSED_ALL_ORDERS
}
export type TWsMessageAllOrdersAction = {
  readonly type: typeof WS_GET_MESSAGE_ALL_ORDERS
  readonly payload: TWSResponse
}

export type TWsAllOrdersActions =
  | TConnectAllOrdersAction
  | TDisconnectAllOrdersAction
  | TWsConnectingAllOrdersAction
  | TWsOpenAllOrdersAction
  | TWsErrorAllOrdersAction
  | TWsCloseAllOrdersAction
  | TWsMessageAllOrdersAction
