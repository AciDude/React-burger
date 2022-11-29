import { getOrderAPI } from '../../utils/burger-api'
import { CLEAR_CONSTRUCTOR_LIST } from './burger-constructor'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'
export const CLEAR_ORDER = 'CLEAR_ORDER'

export function getOrder(bun, fillings) {
  const ingredientsId = [
    bun._id,
    ...fillings.map(element => element._id),
    bun._id
  ]
  const requestBody = { ingredients: ingredientsId }
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    getOrderAPI(requestBody)
      .then(res => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order
        })
      })
      .then(() => {
        dispatch({
          type: CLEAR_CONSTRUCTOR_LIST
        })
      })
      .catch(error =>
        dispatch({
          type: GET_ORDER_FAILED
        })
      )
  }
}
