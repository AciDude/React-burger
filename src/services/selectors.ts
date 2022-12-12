import {
  TOrder,
  TIngredientBun,
  TIngredientMain,
  TIngredientSauce,
  TUser
} from '../utils/data-types'
import { RootState } from './types'

export const selectOrder = (state: RootState): Readonly<TOrder | null> =>
  state.orderDetails.order

export const selectOrderRequest = (state: RootState): boolean | null =>
  state.orderDetails.orderRequest

export const selectUserName = (
  state: RootState
): Readonly<string | undefined> => state.auth.user?.name

export const selectUser = (state: RootState): Readonly<TUser | null> =>
  state.auth.user

export const selectLogoutRequest = (state: RootState): boolean =>
  state.auth.logoutRequest

export const selectLoginRequest = (state: RootState): boolean =>
  state.auth.loginRequest

export const selectRegisterRequest = (state: RootState): boolean =>
  state.auth.registerRequest

export const selectIsUserAuthChecked = (state: RootState): boolean =>
  state.auth.isUserAuthChecked

export const selectConstructorBun = (
  state: RootState
): Readonly<TIngredientBun | null> => state.burgerConstructor.bun

export const selectConstructorFillings = (
  state: RootState
): ReadonlyArray<TIngredientMain | TIngredientSauce | never> =>
  state.burgerConstructor.fillings

export const selectBuns = (
  state: RootState
): ReadonlyArray<TIngredientBun | never> =>
  state.burgerIngredients.ingredients.filter(
    (ingredient): ingredient is TIngredientBun =>
      (ingredient as TIngredientBun).type === 'bun'
  )

export const selectMains = (
  state: RootState
): ReadonlyArray<TIngredientMain | never> =>
  state.burgerIngredients.ingredients.filter(
    (ingredient): ingredient is TIngredientMain =>
      (ingredient as TIngredientMain).type === 'main'
  )

export const selectSauces = (
  state: RootState
): ReadonlyArray<TIngredientSauce | never> =>
  state.burgerIngredients.ingredients.filter(
    (ingredient): ingredient is TIngredientSauce =>
      (ingredient as TIngredientSauce).type === 'sauce'
  )

export const selectIngredient = (state: RootState) =>
  state.burgerIngredients.ingredients

export const selectAllOrders = (state: RootState) =>
  state.wsAllOrders.data?.orders

export const selectUsersOrders = (state: RootState) =>
  state.wsUsersOrders.data?.orders

export const selectTotal = (state: RootState) => state.wsAllOrders.data?.total

export const selectTotalToday = (state: RootState) =>
  state.wsAllOrders.data?.totalToday
