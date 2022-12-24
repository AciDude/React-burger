import {
  WS_CONNECTION_CLOSED_ALL_ORDERS,
  WS_CONNECTION_ERROR_ALL_ORDERS,
  WS_CONNECTION_START_ALL_ORDERS,
  WS_CONNECTION_SUCCESS_ALL_ORDERS,
  WS_GET_MESSAGE_ALL_ORDERS
} from '../actions/ws-all-orders'
import { TWSResponse } from '../../utils/data-types'
import { TWsAllOrdersActions } from '../types/ws-all-orders'

export type TWsState = {
  readonly data: TWSResponse | null
  readonly wsConnecting: boolean
  readonly wsConnectingFailed: boolean
  readonly wsConnect: boolean
}

export const initialState: TWsState = {
  data: null,
  wsConnecting: false,
  wsConnectingFailed: false,
  wsConnect: false
}

export const wsAllOrdersReducer = (
  state = initialState,
  action: TWsAllOrdersActions
): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_START_ALL_ORDERS: {
      return {
        ...state,
        wsConnecting: true,
        wsConnect: false,
        wsConnectingFailed: false
      }
    }
    case WS_CONNECTION_SUCCESS_ALL_ORDERS: {
      return {
        ...state,
        wsConnecting: false,
        wsConnectingFailed: false,
        wsConnect: true
      }
    }
    case WS_CONNECTION_ERROR_ALL_ORDERS: {
      return {
        ...state,
        wsConnect: false,
        wsConnecting: false,
        wsConnectingFailed: true
      }
    }
    case WS_CONNECTION_CLOSED_ALL_ORDERS: {
      return {
        ...state,
        wsConnect: false,
        wsConnecting: false,
        wsConnectingFailed: false,
        data: null
      }
    }
    case WS_GET_MESSAGE_ALL_ORDERS: {
      return {
        ...state,
        data: action.payload
      }
    }
    default: {
      return state
    }
  }
}
