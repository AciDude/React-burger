import { combineReducers } from 'redux'
import { burgerIngredientsReducer } from './burger-ingredients'
import { burgerConstructorReducer } from './burger-constructor'
import { orderDetailsReducer } from './order-details'
import { userReducer } from './auth'
import { wsAllOrdersReducer } from './ws-all-orders'
import { wsUserOrdersReducer } from './ws-users-orders'

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  auth: userReducer,
  wsAllOrders: wsAllOrdersReducer,
  wsUsersOrders: wsUserOrdersReducer,
})
