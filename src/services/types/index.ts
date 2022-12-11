import { ThunkAction } from 'redux-thunk'
import { store } from '../store'
import { TAuthActions } from '../types/auth'
import { TOrderDetailsActions } from '../types/order-details'
import { TBurgerConstructorActions } from './burger-constructor'
import { TWsAllOrdersActions } from './ws-all-orders'
import { TBurgerIngredientsActions } from '../types/burger-ingredients'

type TApplicationActions =
  | TBurgerIngredientsActions
  | TAuthActions
  | TOrderDetailsActions
  | TBurgerConstructorActions
  | TWsAllOrdersActions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  void,
  TApplicationActions
>
