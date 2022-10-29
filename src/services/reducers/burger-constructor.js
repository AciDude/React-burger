import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_CONSTRUCTOR_LIST,
  CLEAR_CONSTRUCTOR_LIST
} from '../actions/burger-constructor'

const initialState = {
  bun: null,
  fillings: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return action.ingredient.type === 'bun'
        ? {
            ...state,
            bun: action.ingredient
          }
        : {
            ...state,
            fillings: [...state.fillings, action.ingredient]
          }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        fillings: state.fillings.filter(filling => filling.dragId !== action.id)
      }
    }
    case UPDATE_CONSTRUCTOR_LIST: {
      return {
        ...state,
        fillings: action.fillings
      }
    }
    case CLEAR_CONSTRUCTOR_LIST: {
      return {
        ...state,
        bun: null,
        fillings: []
      }
    }
    default: {
      return state
    }
  }
}
