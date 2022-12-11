import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_CONSTRUCTOR_LIST,
  CLEAR_CONSTRUCTOR_LIST,
  TBurgerConstructorActions
} from '../actions/burger-constructor'
import {
  TIngredientBun,
  TIngredientMain,
  TIngredientSauce
} from '../../utils/data-types'

type TBurgerConstructorState = {
  readonly bun: TIngredientBun | null
  readonly fillings: ReadonlyArray<TIngredientMain | TIngredientSauce | never>
}

const initialState: TBurgerConstructorState = {
  bun: null,
  fillings: []
}

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
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
