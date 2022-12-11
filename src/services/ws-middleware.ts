import { Middleware } from 'redux'
import { wsActions as actions } from './actions/web-socket'

export const socketMiddleware = (wsActions: typeof actions): Middleware => {
  return store => {
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
