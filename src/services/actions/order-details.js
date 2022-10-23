import { request } from '../../utils/request'
import { BASE_URL } from '../../utils/base-url'
import { CLEAR_CONSTRUCTOR_LIST } from './burger-constructor'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'
export const CLEAR_ORDER = 'CLEAR_ORDER'

const URL = `${BASE_URL}orders`

export function getOrder(bun, fillings) {
  const ingredientsId = [
    bun._id,
    ...fillings.map(element => element._id),
    bun._id
  ]
  const requestBody = { ingredients: ingredientsId }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(requestBody)
  }
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    request(URL, options)
      .then(result => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: result
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
