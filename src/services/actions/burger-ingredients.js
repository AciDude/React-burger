import { request } from '../../utils/request'
import { BASE_URL } from '../../utils/base-url'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT'
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT'

const URL = `${BASE_URL}ingredients`

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    request(URL)
      .then(result => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: result.data
        })
      })
      .catch(error =>
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error
        })
      )
  }
}
