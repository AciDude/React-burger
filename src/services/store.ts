import { rootReducer } from './reducers/reducers'
import { configureStore } from '@reduxjs/toolkit'
import { socketMiddleware } from './middlewares/ws-middleware'
import { wsAllOrdersActions } from './actions/ws-all-orders'
import { wsUsersOrdersActions } from './actions/ws-users-orders'

export const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        socketMiddleware(wsAllOrdersActions),
        socketMiddleware(wsUsersOrdersActions)
      ),
    devTools: process.env.NODE_ENV !== 'production'
  })

  return store
}

export const store = configureAppStore()
