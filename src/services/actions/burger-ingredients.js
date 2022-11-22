import { getIngredientsAPI } from '../../utils/burger-api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT'
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT'

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    getIngredientsAPI()
      .then(data => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: data
        })
      })
      .catch(error =>
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      )
  }
}
