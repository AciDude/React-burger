import { rootReducer } from './reducers/reducers'
import { configureStore } from '@reduxjs/toolkit'

export const configureAppStore = (initialState) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    initialState
  })

  return store
}
