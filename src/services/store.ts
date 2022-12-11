import { rootReducer } from './reducers/reducers'
import { configureStore } from '@reduxjs/toolkit'
import { socketMiddleware } from './ws-middleware'
import { wsActions } from './actions/web-socket'

export const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(socketMiddleware(wsActions)),
    devTools: process.env.NODE_ENV !== 'production'
  })

  return store
}

export const store = configureAppStore()
