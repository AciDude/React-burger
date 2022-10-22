import { request } from '../../utils/request'
import { ADD_INGREDIENT } from './burger-constructor'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT'
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT'

export function getIngredients(URL) {
  return function (dispatch, getState) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    const prevState = getState()
    request(URL)
      .then(result => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: result.data
        })
      })
      .then(() => {
        prevState.burgerIngredients.ingredients &&
          dispatch({
            type: ADD_INGREDIENT,
            ingredient: getState().burgerIngredients.ingredients.find(
              ingredient => ingredient.type === 'bun'
            )
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
