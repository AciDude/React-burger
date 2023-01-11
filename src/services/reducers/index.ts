import { combineReducers } from 'redux'
import { burgerIngredientsReducer } from './burger-ingredients'
import { burgerConstructorReducer } from './burger-constructor'
import { orderDetailsReducer } from './order-details'
import { userReducer } from './auth'
import { wsAllOrdersReducer } from './ws-all-orders'
import { wsUserOrdersReducer } from './ws-users-orders'
import { SET_TYPE_SCREEN } from '../actions'
import { TSetTypeScreen } from '../types'

export const initialState = false

export const typeScreenReducer = (state = initialState, action: TSetTypeScreen) => {
  switch (action.type) {
    case SET_TYPE_SCREEN: {
      return action.payload
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
  auth: userReducer,
  wsAllOrders: wsAllOrdersReducer,
  wsUsersOrders: wsUserOrdersReducer,
  isMobile: typeScreenReducer
})
