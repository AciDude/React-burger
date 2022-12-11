import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TBurgerIngredientsActions
} from '../actions/burger-ingredients'
import { TIngredients } from '../../utils/data-types'

type TBurgerIngredientsState = {
  readonly ingredients: TIngredients
  readonly ingredientsRequest: boolean
  readonly ingredientsFailed: boolean
}

const initialState: TBurgerIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
}

export const burgerIngredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
): TBurgerIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      }
    }
    default: {
      return state
    }
  }
}
