import { combineReducers } from 'redux'
import { burgerIngredientsReducer } from './burger-ingredients'
import { burgerConstructorReducer } from './burger-constructor'
import { currentIngredientReducer } from './current-ingredient'
import { orderDetailsReducer } from './order-details'

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_MODAL_TYPE,
  CLEAR_MODAL_TYPE
} from '../actions/actions'

const initialState = {
  isOpenModal: false,
  contentType: ''
}

const switchModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isOpenModal: true
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isOpenModal: false
      }
    }
    case SET_MODAL_TYPE: {
      return {
        ...state,
        contentType: action.payload
      }
    }
    case CLEAR_MODAL_TYPE: {
      return {
        ...state,
        contentType: ''
      }
    }
    default: {
      return state
    }
  }
}

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  currentIngredient: currentIngredientReducer,
  switchModal: switchModalReducer
})
