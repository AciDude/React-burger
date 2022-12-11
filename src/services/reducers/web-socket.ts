import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  TWsActions
} from '../actions/web-socket'
import { TWSResponse } from '../../utils/data-types'

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

export const wsReducer = (
  state = initialState,
  action: TWsActions
): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsConnecting: true,
        wsConnect: false,
        wsConnectingFailed: false
      }
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnecting: false,
        wsConnectingFailed: false,
        wsConnect: true
      }
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnect: false,
        wsConnecting: false,
        wsConnectingFailed: true
      }
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnect: false,
        wsConnecting: false,
        wsConnectingFailed: false,
        data: null
      }
    }
    case WS_GET_MESSAGE: {
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
