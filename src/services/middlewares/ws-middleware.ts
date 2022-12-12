import { Middleware, MiddlewareAPI } from 'redux'
import { AppDispatch } from '../types'
import { RootState } from '../types'
import { TWsActions } from '../types/ws-middleware'

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null
    let url = ''
    return next => action => {
      const { dispatch } = store
      const {
        connect,
        disconnect,
        wsClose,
        wsConnecting,
        wsError,
        wsMessage,
        wsOpen
      } = wsActions
      if (connect('').type === action.type) {
        url = action.payload
        socket = new WebSocket(url)
        dispatch(wsConnecting())
      }
      if (socket) {
        socket.onopen = () => dispatch(wsOpen())
        socket.onerror = () => dispatch(wsError())
        socket.onmessage = event => dispatch(wsMessage(JSON.parse(event.data)))
        socket.onclose = () => dispatch(wsClose())
        if (disconnect().type === action.type) {
          socket.close()
        }
      }
      next(action)
    }
  }
}
