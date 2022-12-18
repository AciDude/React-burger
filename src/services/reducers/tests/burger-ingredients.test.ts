import {
  burgerIngredientsReducer,
  TBurgerIngredientsState
} from '../burger-ingredients'
import { TBurgerIngredientsActions } from '../../types/burger-ingredients'
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../../actions/burger-ingredients'
import { TIngredients } from '../../../utils/data-types'

const initialState: TBurgerIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
}
const ingredients: TIngredients = [
  {
    _id: '_id',
    name: 'name',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: 'image',
    image_mobile: 'image_mobile',
    image_large: 'image_large',
    __v: 0,
    type: 'main',
    dragId: '1'
  },
  {
    _id: '_id',
    name: 'name',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: 'image',
    image_mobile: 'image_mobile',
    image_large: 'image_large',
    __v: 0,
    type: 'main',
    dragId: '2'
  },
  {
    _id: '_id',
    name: 'name',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: 'image',
    image_mobile: 'image_mobile',
    image_large: 'image_large',
    __v: 0,
    type: 'main',
    dragId: '3'
  }
]

describe('Redux burger ingredients store', () => {
  test('Should return the initial state', () => {
    expect(
      burgerIngredientsReducer(undefined, {} as TBurgerIngredientsActions)
    ).toEqual(initialState)
  })

  test("Should return state with 'ingredientsRequest: true'", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_REQUEST
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true
    })
  })

  test('Should return state with ingredients after rising get ingredients success action', () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients
      })
    ).toEqual({
      ...initialState,
      ingredients
    })
  })

  test('Should return state with error after rising get ingredients error action', () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_FAILED
      })
    ).toEqual({
      ...initialState,
      ingredientsFailed: true
    })
  })
})
