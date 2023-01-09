import { wsUserOrdersReducer } from '../ws-users-orders'
import {
  WS_CONNECTION_START_USERS_ORDERS,
  WS_CONNECTION_SUCCESS_USERS_ORDERS,
  WS_CONNECTION_ERROR_USERS_ORDERS,
  WS_CONNECTION_CLOSED_USERS_ORDERS,
  WS_GET_MESSAGE_USERS_ORDERS
} from '../../actions/ws-users-orders'
import { TWsUsersOrdersActions } from '../../types/ws-users-orders'
import { initialState } from '../ws-users-orders'

describe('Redux WS users orders store', () => {
  test('Should return the initial state', () => {
    expect(wsUserOrdersReducer(undefined, {} as TWsUsersOrdersActions)).toEqual(
      initialState
    )
  })

  test("Should return state with 'wsConnecting: true'", () => {
    expect(
      wsUserOrdersReducer(initialState, {
        type: WS_CONNECTION_START_USERS_ORDERS
      })
    ).toEqual({
      ...initialState,
      wsConnecting: true
    })
  })

  test("Should return state with 'wsConnect: true'", () => {
    expect(
      wsUserOrdersReducer(initialState, {
        type: WS_CONNECTION_SUCCESS_USERS_ORDERS
      })
    ).toEqual({
      ...initialState,
      wsConnect: true
    })
  })

  test("Should return state with 'wsConnectingFailed: true'", () => {
    expect(
      wsUserOrdersReducer(initialState, {
        type: WS_CONNECTION_ERROR_USERS_ORDERS
      })
    ).toEqual({
      ...initialState,
      wsConnectingFailed: true
    })
  })

  test('Should return state with cleared data', () => {
    expect(
      wsUserOrdersReducer(initialState, {
        type: WS_CONNECTION_CLOSED_USERS_ORDERS
      })
    ).toEqual({
      ...initialState,
      data: null
    })
  })

  test('Should return state with data', () => {
    const data = { success: true, orders: [], total: 0, totalToday: 0 }
    expect(
      wsUserOrdersReducer(initialState, {
        type: WS_GET_MESSAGE_USERS_ORDERS,
        payload: data
      })
    ).toEqual({
      ...initialState,
      data: data
    })
  })
})
