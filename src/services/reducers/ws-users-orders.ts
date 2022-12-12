import {
  WS_CONNECTION_CLOSED_USERS_ORDERS,
  WS_CONNECTION_ERROR_USERS_ORDERS,
  WS_CONNECTION_START_USERS_ORDERS,
  WS_CONNECTION_SUCCESS_USERS_ORDERS,
  WS_GET_MESSAGE_USERS_ORDERS
} from '../actions/ws-users-orders'
import { TWSResponse } from '../../utils/data-types'
import { TWsUsersOrdersActions } from '../types/ws-users-orders'

export type TWsState = {
  readonly data: TWSResponse | null
  readonly wsConnecting: boolean
  readonly wsConnectingFailed: boolean
  readonly wsConnect: boolean
}

const initialState: TWsState = {
  data: null,
  wsConnecting: false,
  wsConnectingFailed: false,
  wsConnect: false
}

export const wsUserOrdersReducer = (
  state = initialState,
  action: TWsUsersOrdersActions
): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_START_USERS_ORDERS: {
      return {
        ...state,
        wsConnecting: true,
        wsConnect: false,
        wsConnectingFailed: false
      }
    }
    case WS_CONNECTION_SUCCESS_USERS_ORDERS: {
      return {
        ...state,
        wsConnecting: false,
        wsConnectingFailed: false,
        wsConnect: true
      }
    }
    case WS_CONNECTION_ERROR_USERS_ORDERS: {
      return {
        ...state,
        wsConnect: false,
        wsConnecting: false,
        wsConnectingFailed: true
      }
    }
    case WS_CONNECTION_CLOSED_USERS_ORDERS: {
      return {
        ...state,
        wsConnect: false,
        wsConnecting: false,
        wsConnectingFailed: false,
        data: null
      }
    }
    case WS_GET_MESSAGE_USERS_ORDERS: {
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
