import { getIngredientsAPI } from '../../utils/burger-api'
import { TIngredients } from '../../utils/data-types'
import { AppThunk } from '../types'
import {
  TGetIngredientsRequestAction,
  TGetIngredientsSuccessAction,
  TGetIngredientsFailedAction
} from '../types/burger-ingredients'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const getIngredientsRequest = (): TGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST
})
export const getIngredientsSuccess = (
  ingredients: TIngredients
): TGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients
})
export const getIngredientsFailed = (): TGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
})

export function getIngredients(): AppThunk {
  return function (dispatch) {
    dispatch(getIngredientsRequest())
    getIngredientsAPI()
      .then(res => {
        dispatch(getIngredientsSuccess(res.data))
      })
      .catch(error => dispatch(getIngredientsFailed()))
  }
}
