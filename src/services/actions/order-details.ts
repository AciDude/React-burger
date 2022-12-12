import { getOrderAPI } from '../../utils/burger-api'
import { CLEAR_CONSTRUCTOR_LIST } from './burger-constructor'
import { AppThunk } from '../types'
import {
  TIngredientBun,
  TIngredientMain,
  TIngredientSauce,
  TOrder
} from '../../utils/data-types'
import {
  TGetOrderRequestAction,
  TClearOrderAction,
  TGetOrderFailedAction,
  TGetOrderSuccessAction
} from '../types/order-details'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'
export const CLEAR_ORDER = 'CLEAR_ORDER'

export const getOrderRequest = (): TGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST
})
export const getOrderSuccess = (order: TOrder): TGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  order
})
export const getOrderFailed = (): TGetOrderFailedAction => ({
  type: GET_ORDER_FAILED
})
export const clearOrder = (): TClearOrderAction => ({
  type: CLEAR_ORDER
})

export function getOrder(
  bun: TIngredientBun,
  fillings: ReadonlyArray<TIngredientMain | TIngredientSauce>
): AppThunk {
  const ingredientsId = [
    bun._id,
    ...fillings.map(element => element._id),
    bun._id
  ]
  const requestBody = { ingredients: ingredientsId }
  return function (dispatch) {
    dispatch(getOrderRequest())
    getOrderAPI(requestBody)
      .then(res => {
        dispatch(getOrderSuccess(res.order))
      })
      .then(() => {
        dispatch({
          type: CLEAR_CONSTRUCTOR_LIST
        })
      })
      .catch(error => dispatch(getOrderFailed()))
  }
}
