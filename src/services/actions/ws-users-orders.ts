import { TWSResponse } from '../../utils/data-types'
import {
  TConnectUsersOrdersAction,
  TDisconnectUsersOrdersAction,
  TWsConnectingUsersOrdersAction,
  TWsOpenUsersOrdersAction,
  TWsErrorUsersOrdersAction,
  TWsCloseUsersOrdersAction,
  TWsMessageUsersOrdersAction
} from '../types/ws-users-orders'

export const WS_CONNECT_USERS_ORDERS = 'WS_CONNECT_USERS_ORDERS'
export const WS_DISCONNECT_USERS_ORDERS = 'WS_DISCONNECT_USERS_ORDERS'
export const WS_CONNECTION_START_USERS_ORDERS =
  'WS_CONNECTION_START_USERS_ORDERS'
export const WS_CONNECTION_SUCCESS_USERS_ORDERS =
  'WS_CONNECTION_SUCCESS_USERS_ORDERS'
export const WS_CONNECTION_ERROR_USERS_ORDERS =
  'WS_CONNECTION_ERROR_USERS_ORDERS'
export const WS_CONNECTION_CLOSED_USERS_ORDERS =
  'WS_CONNECTION_CLOSED_USERS_ORDERS'
export const WS_GET_MESSAGE_USERS_ORDERS = 'WS_GET_MESSAGE_USERS_ORDERS'

export const connectUsersOrders = (
  payload: string
): TConnectUsersOrdersAction => ({
  type: WS_CONNECT_USERS_ORDERS,
  payload
})
export const disconnectUsersOrders = (): TDisconnectUsersOrdersAction => ({
  type: WS_DISCONNECT_USERS_ORDERS
})
export const wsConnectingUsersOrders = (): TWsConnectingUsersOrdersAction => ({
  type: WS_CONNECTION_START_USERS_ORDERS
})
export const wsOpenUsersOrders = (): TWsOpenUsersOrdersAction => ({
  type: WS_CONNECTION_SUCCESS_USERS_ORDERS
})
export const wsErrorUsersOrders = (): TWsErrorUsersOrdersAction => ({
  type: WS_CONNECTION_ERROR_USERS_ORDERS
})
export const wsCloseUsersOrders = (): TWsCloseUsersOrdersAction => ({
  type: WS_CONNECTION_CLOSED_USERS_ORDERS
})
export const wsMessageUsersOrders = (
  payload: TWSResponse
): TWsMessageUsersOrdersAction => ({
  type: WS_GET_MESSAGE_USERS_ORDERS,
  payload
})

export const wsUsersOrdersActions = {
  connect: connectUsersOrders,
  disconnect: disconnectUsersOrders,
  wsConnecting: wsConnectingUsersOrders,
  wsOpen: wsOpenUsersOrders,
  wsError: wsErrorUsersOrders,
  wsClose: wsCloseUsersOrders,
  wsMessage: wsMessageUsersOrders
}
