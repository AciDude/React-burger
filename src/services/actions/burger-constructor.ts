import {
  TIngredientMain,
  TIngredientSauce,
  TIngredientBun
} from '../../utils/data-types'
import {
  TAddIngredientAction,
  TDeleteIngredientAction,
  TUpdateConstructorListAction,
  TClearConstructorList
} from '../types/burger-constructor'

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const UPDATE_CONSTRUCTOR_LIST = 'UPDATE_CONSTRUCTOR_LIST'
export const CLEAR_CONSTRUCTOR_LIST = 'CLEAR_CONSTRUCTOR_LIST'

export const addIngredient = (
  ingredient: TIngredientMain | TIngredientSauce | TIngredientBun
): TAddIngredientAction => ({
  type: ADD_INGREDIENT,
  ingredient
})
export const deleteIngredient = (id: string): TDeleteIngredientAction => ({
  type: DELETE_INGREDIENT,
  id
})
export const updateConstructorList = (
  fillings: ReadonlyArray<TIngredientMain | TIngredientSauce | never>
): TUpdateConstructorListAction => ({
  type: UPDATE_CONSTRUCTOR_LIST,
  fillings
})
export const clearConstructorList = (): TClearConstructorList => ({
  type: CLEAR_CONSTRUCTOR_LIST
})
