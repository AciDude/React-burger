import { orderDetailsReducer } from '../order-details'
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_ORDER
} from '../../actions/order-details'
import { TOrderDetailsActions } from '../../types/order-details'
import { initialState } from '../order-details'

describe('Redux order details store', () => {
  test('Should return the initial state', () => {
    expect(orderDetailsReducer(undefined, {} as TOrderDetailsActions)).toEqual(
      initialState
    )
  })

  test("Should return state with 'orderRequest: true'", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: GET_ORDER_REQUEST
      })
    ).toEqual({
      ...initialState,
      orderRequest: true
    })
  })

  test('Should return state with order after rising order success action', () => {
    const order = {
      ingredients: [''],
      _id: '_id',
      status: 'status',
      name: 'name',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      number: 0
    }
    expect(
      orderDetailsReducer(initialState, {
        type: GET_ORDER_SUCCESS,
        order: order
      })
    ).toEqual({
      ...initialState,
      order: order
    })
  })

  test('Should return state with error after rising get order error action', () => {
    expect(
      orderDetailsReducer(initialState, {
        type: GET_ORDER_FAILED
      })
    ).toEqual({
      ...initialState,
      orderFailed: true
    })
  })

  test('Should return state with cleared order', () => {
    expect(
      orderDetailsReducer(initialState, {
        type: CLEAR_ORDER
      })
    ).toEqual({
      ...initialState,
      order: null
    })
  })
})
