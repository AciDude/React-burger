import { request } from '../../utils/request'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'
export const CLEAR_ORDER = 'CLEAR_ORDER'

export function getOrder(URL, options) {
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
      .catch(error =>
        dispatch({
          type: GET_ORDER_FAILED
        })
      )
  }
}
