import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_CONSTRUCTOR_LIST,
  CLEAR_CONSTRUCTOR_LIST
} from '../actions/burger-constructor'
import {
  TIngredientMain,
  TIngredientSauce,
  TIngredientBun
} from '../../utils/data-types'

export type TAddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT
  readonly ingredient: TIngredientMain | TIngredientSauce | TIngredientBun
}
export type TDeleteIngredientAction = {
  readonly type: typeof DELETE_INGREDIENT
  readonly id: string
}
export type TUpdateConstructorListAction = {
  readonly type: typeof UPDATE_CONSTRUCTOR_LIST
  readonly fillings: ReadonlyArray<TIngredientMain | TIngredientSauce | never>
}
export type TClearConstructorList = {
  readonly type: typeof CLEAR_CONSTRUCTOR_LIST
}

export type TBurgerConstructorActions =
  | TAddIngredientAction
  | TDeleteIngredientAction
  | TUpdateConstructorListAction
  | TClearConstructorList
