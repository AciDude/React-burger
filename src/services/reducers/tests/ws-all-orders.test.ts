import { wsAllOrdersReducer } from '../ws-all-orders'
import {
  WS_CONNECTION_START_ALL_ORDERS,
  WS_CONNECTION_SUCCESS_ALL_ORDERS,
  WS_CONNECTION_ERROR_ALL_ORDERS,
  WS_CONNECTION_CLOSED_ALL_ORDERS,
  WS_GET_MESSAGE_ALL_ORDERS
} from '../../actions/ws-all-orders'
import { TWsAllOrdersActions } from '../../types/ws-all-orders'
import { initialState } from '../ws-all-orders'

describe('Redux WS all orders store', () => {
  test('Should return the initial state', () => {
    expect(wsAllOrdersReducer(undefined, {} as TWsAllOrdersActions)).toEqual(
      initialState
    )
  })

  test("Should return state with 'wsConnecting: true'", () => {
    expect(
      wsAllOrdersReducer(initialState, {
        type: WS_CONNECTION_START_ALL_ORDERS
      })
    ).toEqual({
      ...initialState,
      wsConnecting: true
    })
  })

  test("Should return state with 'wsConnect: true'", () => {
    expect(
      wsAllOrdersReducer(initialState, {
        type: WS_CONNECTION_SUCCESS_ALL_ORDERS
      })
    ).toEqual({
      ...initialState,
      wsConnect: true
    })
  })

  test("Should return state with 'wsConnectingFailed: true'", () => {
    expect(
      wsAllOrdersReducer(initialState, {
        type: WS_CONNECTION_ERROR_ALL_ORDERS
      })
    ).toEqual({
      ...initialState,
      wsConnectingFailed: true
    })
  })

  test('Should return state with cleared data', () => {
    expect(
      wsAllOrdersReducer(initialState, {
        type: WS_CONNECTION_CLOSED_ALL_ORDERS
      })
    ).toEqual({
      ...initialState,
      data: null
    })
  })

  test('Should return state with data', () => {
    const data = { success: true, orders: [], total: 0, totalToday: 0 }
    expect(
      wsAllOrdersReducer(initialState, {
        type: WS_GET_MESSAGE_ALL_ORDERS,
        payload: data
      })
    ).toEqual({
      ...initialState,
      data: data
    })
  })
})
