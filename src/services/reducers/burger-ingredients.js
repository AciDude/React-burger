import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT
} from '../actions/burger-ingredients'

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
}

export const burgerIngredientsReducer = (state = initialState, action) => {
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
    case INCREASE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.map(ingredient => {
          return ingredient._id === action.id
            ? {
                ...ingredient,
                __v: ingredient.__v + 1
              }
            : ingredient
        })
      }
    }
    case DECREASE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.map(ingredient => {
          return ingredient._id === action.id
            ? {
                ...ingredient,
                __v: ingredient.__v > 0 ? ingredient.__v - 1 : 0
              }
            : ingredient
        })
      }
    }
    default: {
      return state
    }
  }
}
