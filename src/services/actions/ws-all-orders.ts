import { TWSResponse } from '../../utils/data-types'
import {
  TConnectAllOrdersAction,
  TDisconnectAllOrdersAction,
  TWsConnectingAllOrdersAction,
  TWsOpenAllOrdersAction,
  TWsErrorAllOrdersAction,
  TWsCloseAllOrdersAction,
  TWsMessageAllOrdersAction
} from '../types/ws-all-orders'

export const WS_CONNECT_ALL_ORDERS = 'WS_CONNECT_ALL_ORDERS'
export const WS_DISCONNECT_ALL_ORDERS = 'WS_DISCONNECT_ALL_ORDERS'
export const WS_CONNECTION_START_ALL_ORDERS = 'WS_CONNECTION_START_ALL_ORDERS'
export const WS_CONNECTION_SUCCESS_ALL_ORDERS =
  'WS_CONNECTION_SUCCESS_ALL_ORDERS'
export const WS_CONNECTION_ERROR_ALL_ORDERS = 'WS_CONNECTION_ERROR_ALL_ORDERS'
export const WS_CONNECTION_CLOSED_ALL_ORDERS = 'WS_CONNECTION_CLOSED_ALL_ORDERS'
export const WS_GET_MESSAGE_ALL_ORDERS = 'WS_GET_MESSAGE_ALL_ORDERS'

export const connectAllOrders = (payload: string): TConnectAllOrdersAction => ({
  type: WS_CONNECT_ALL_ORDERS,
  payload
})
export const disconnectAllOrders = (): TDisconnectAllOrdersAction => ({
  type: WS_DISCONNECT_ALL_ORDERS
})
export const wsConnectingAllOrders = (): TWsConnectingAllOrdersAction => ({
  type: WS_CONNECTION_START_ALL_ORDERS
})
export const wsOpenAllOrders = (): TWsOpenAllOrdersAction => ({
  type: WS_CONNECTION_SUCCESS_ALL_ORDERS
})
export const wsErrorAllOrders = (): TWsErrorAllOrdersAction => ({
  type: WS_CONNECTION_ERROR_ALL_ORDERS
})
export const wsCloseAllOrders = (): TWsCloseAllOrdersAction => ({
  type: WS_CONNECTION_CLOSED_ALL_ORDERS
})
export const wsMessageAllOrders = (
  payload: TWSResponse
): TWsMessageAllOrdersAction => ({
  type: WS_GET_MESSAGE_ALL_ORDERS,
  payload
})

export const wsAllOrdersActions = {
  connect: connectAllOrders,
  disconnect: disconnectAllOrders,
  wsConnecting: wsConnectingAllOrders,
  wsOpen: wsOpenAllOrders,
  wsError: wsErrorAllOrders,
  wsClose: wsCloseAllOrders,
  wsMessage: wsMessageAllOrders
}
