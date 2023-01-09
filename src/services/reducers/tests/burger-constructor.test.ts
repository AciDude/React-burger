import {
  burgerConstructorReducer,
  TBurgerConstructorState
} from '../burger-constructor'
import { TBurgerConstructorActions } from '../../types/burger-constructor'
import { TIngredientBun, TIngredientMain } from '../../../utils/data-types'
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_CONSTRUCTOR_LIST,
  CLEAR_CONSTRUCTOR_LIST
} from '../../actions/burger-constructor'
import { initialState } from '../burger-constructor'
import { ingredientPlaceholder } from './constants'

const state: TBurgerConstructorState = {
  bun: null,
  fillings: [
    {
      ...ingredientPlaceholder,
      type: 'main',
      dragId: '1'
    },
    {
      ...ingredientPlaceholder,
      type: 'main',
      dragId: '2'
    },
    {
      ...ingredientPlaceholder,
      type: 'main',
      dragId: '3'
    }
  ]
}

describe('Redux burger constructor store', () => {
  test('Should return the initial state', () => {
    expect(
      burgerConstructorReducer(undefined, {} as TBurgerConstructorActions)
    ).toEqual(initialState)
  })

  test('Should return state with bun', () => {
    const ingredient: TIngredientBun = {
      ...ingredientPlaceholder,
      type: 'bun'
    }
    expect(
      burgerConstructorReducer(initialState, {
        type: ADD_INGREDIENT,
        ingredient: ingredient
      })
    ).toEqual({
      ...initialState,
      bun: ingredient
    })
  })

  test('Should return state with fillings', () => {
    const ingredient: TIngredientMain = {
      ...ingredientPlaceholder,
      type: 'main'
    }
    expect(
      burgerConstructorReducer(initialState, {
        type: ADD_INGREDIENT,
        ingredient: ingredient
      })
    ).toEqual({
      ...initialState,
      fillings: [ingredient]
    })
  })

  test('Should return state with fillings delete ingredient', () => {
    const fillings = [...state.fillings]
    fillings.shift()
    expect(
      burgerConstructorReducer(state, {
        type: DELETE_INGREDIENT,
        id: '1'
      })
    ).toEqual({
      ...state,
      fillings
    })
  })

  test('Should return state with update constructor list', () => {
    const fillings = state.fillings
    expect(
      burgerConstructorReducer(initialState, {
        type: UPDATE_CONSTRUCTOR_LIST,
        fillings
      })
    ).toEqual({
      ...initialState,
      fillings
    })
  })

  test('Should return state with clear constructor list', () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: CLEAR_CONSTRUCTOR_LIST
      })
    ).toEqual({
      ...initialState,
      bun: null,
      fillings: []
    })
  })
})
