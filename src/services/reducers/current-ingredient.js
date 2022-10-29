import {
  SET_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT
} from '../actions/ingredient-details'

const initialState = {
  ingredient: null
}

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return {
        ingredient: action.ingredient
      }
    }
    case CLEAR_CURRENT_INGREDIENT: {
      return { ingredient: null }
    }
    default: {
      return state
    }
  }
}
