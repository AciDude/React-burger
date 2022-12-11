import { ThunkAction } from 'redux-thunk'
import { store } from '../store'
import { TAuthActions } from '../actions/auth'
import { TOrderDetailsActions } from '../actions/order-details'
import { TBurgerConstructorActions } from '../actions/burger-constructor'
import { TWsActions } from '../actions/web-socket'
import { TBurgerIngredientsActions } from '../actions/burger-ingredients'

type TApplicationActions =
  | TBurgerIngredientsActions
  | TAuthActions
  | TOrderDetailsActions
  | TBurgerConstructorActions
  | TWsActions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  void,
  TApplicationActions
>
