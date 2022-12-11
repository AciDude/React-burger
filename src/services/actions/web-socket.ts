import { TOrder } from '../../utils/data-types'

export const WS_CONNECT = 'WS_CONNECT'
export const WS_DISCONNECT = 'WS_DISCONNECT'
export const WS_CONNECTION_START = 'WS_CONNECTION_START'
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED'
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE'

export type TConnectAction = {
  readonly type: typeof WS_CONNECT
  readonly payload: string
}
export type TDisconnectAction = {
  readonly type: typeof WS_DISCONNECT
}
export type TWsConnectingAction = {
  readonly type: typeof WS_CONNECTION_START
}
export type TWsOpenAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS
}
export type TWsErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR
}
export type TWsCloseAction = {
  readonly type: typeof WS_CONNECTION_CLOSED
}
export type TWsMessageAction = {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: any
}

export const connect = (payload: string): TConnectAction => ({
  type: WS_CONNECT,
  payload
})
export const disconnect = (): TDisconnectAction => ({ type: WS_DISCONNECT })
export const wsConnecting = (): TWsConnectingAction => ({
  type: WS_CONNECTION_START
})
export const wsOpen = (): TWsOpenAction => ({ type: WS_CONNECTION_SUCCESS })
export const wsError = (): TWsErrorAction => ({ type: WS_CONNECTION_ERROR })
export const wsClose = (): TWsCloseAction => ({ type: WS_CONNECTION_CLOSED })
export const wsMessage = (
  payload: ReadonlyArray<TOrder>
): TWsMessageAction => ({
  type: WS_GET_MESSAGE,
  payload
})

export type TWsActions =
  | TConnectAction
  | TDisconnectAction
  | TWsConnectingAction
  | TWsOpenAction
  | TWsErrorAction
  | TWsCloseAction
  | TWsMessageAction

export const wsActions = {
  connect,
  disconnect,
  wsConnecting,
  wsOpen,
  wsError,
  wsClose,
  wsMessage
}
