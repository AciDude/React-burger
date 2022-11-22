import {
  TStore,
  TOrder,
  TIngredientBun,
  TIngredientMain,
  TIngredientSauce,
  TUser
} from '../utils/types'

export const selectOrder = (state: TStore): Readonly<TOrder | null> =>
  state.orderDetails.order

export const selectOrderRequest = (state: TStore): boolean | null =>
  state.orderDetails.orderRequest

export const selectUserName = (state: TStore): Readonly<string | undefined> =>
  state.auth.user?.name

export const selectUser = (state: TStore): Readonly<TUser | null> =>
  state.auth.user

export const selectLogoutRequest = (state: TStore): boolean =>
  state.auth.logoutRequest

export const selectLoginRequest = (state: TStore): boolean =>
  state.auth.loginRequest

export const selectRegisterRequest = (state: TStore): boolean =>
  state.auth.registerRequest

export const selectIsUserAuthChecked = (state: TStore): boolean =>
  state.auth.isUserAuthChecked

export const selectConstructorBun = (
  state: TStore
): Readonly<TIngredientBun | null> => state.burgerConstructor.bun

export const selectConstructorFillings = (
  state: TStore
): ReadonlyArray<TIngredientMain | TIngredientSauce | never> =>
  state.burgerConstructor.fillings

export const selectBuns = (
  state: TStore
): ReadonlyArray<TIngredientBun | never> =>
  state.burgerIngredients.ingredients.filter(
    (ingredient): ingredient is TIngredientBun =>
      (ingredient as TIngredientBun).type === 'bun'
  )

export const selectMains = (
  state: TStore
): ReadonlyArray<TIngredientMain | never> =>
  state.burgerIngredients.ingredients.filter(
    (ingredient): ingredient is TIngredientMain =>
      (ingredient as TIngredientMain).type === 'main'
  )

export const selectSauces = (
  state: TStore
): ReadonlyArray<TIngredientSauce | never> =>
  state.burgerIngredients.ingredients.filter(
    (ingredient): ingredient is TIngredientSauce =>
      (ingredient as TIngredientSauce).type === 'sauce'
  )

export const selectIngredient = (state: TStore) =>
  state.burgerIngredients.ingredients
