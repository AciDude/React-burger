export type TIngredient = {
  readonly _id: string
  readonly name: string
  readonly type: 'bun' | 'main' | 'sauce'
  readonly proteins: number
  readonly fat: number
  readonly carbohydrates: number
  readonly calories: number
  readonly price: number
  readonly image: string
  readonly image_mobile: string
  readonly image_large: string
  readonly __v: number
}

export type TIngredientBun = Omit<TIngredient, 'type'> & {
  readonly type: 'bun'
}
export type TIngredientMain = Omit<TIngredient, 'type'> & {
  readonly type: 'main'
  readonly dragId: string
}
export type TIngredientSauce = Omit<TIngredient, 'type'> & {
  readonly type: 'sauce'
  readonly dragId: string
}

export type TIngredients = ReadonlyArray<
  TIngredientBun | TIngredientMain | TIngredientSauce | never
>

export type TOwner = {
  readonly name: string
  readonly email: string
  readonly createdAt: string
  readonly updatedAt: string
}

export type TOrder = {
  readonly ingredients: TIngredients
  readonly _id: string
  readonly owner: TOwner
  readonly status: string
  readonly name: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly number: number
  readonly price: number
}

export type TOrderDetails = {
  order: Readonly<TOrder | null>
  orderRequest: boolean
  orderFailed: boolean
}

export type TBurgerIngredients = {
  ingredients: TIngredients
  ingredientsRequest: boolean
  ingredientsFailed: boolean
}

export type TBurgerConstructor = {
  bun: Readonly<TIngredientBun | null>
  fillings: ReadonlyArray<TIngredientMain | TIngredientSauce | never>
}

export type TUser = {
  readonly email: string
  readonly name: string
}

export type TErrorRequest = {
  [name: string]: string | number | boolean
}

export type TAuth = {
  user: Readonly<TUser | null>
  loginRequest: boolean
  loginFailed: boolean
  loginError: TErrorRequest

  registerRequest: boolean
  registerFailed: boolean
  registerError: TErrorRequest

  getUserRequest: boolean
  getUserFailed: boolean
  getUserError: TErrorRequest

  patchUserRequest: boolean
  patchUserFailed: boolean
  patchUserError: TErrorRequest

  logoutRequest: boolean
  logoutFailed: boolean
  logoutError: TErrorRequest

  isUserAuthChecked: boolean
}

export type TStore = {
  burgerIngredients: TBurgerIngredients
  burgerConstructor: TBurgerConstructor
  orderDetails: TOrderDetails
  auth: TAuth
}

export type TLogin = {
  readonly email: string
  readonly password: string
}

export type TRegister = TLogin & {
  readonly name: string
}

export type TPatch = {
  readonly email?: string
  readonly password?: string
  readonly name?: string
}

export type TPasswordReset = Omit<TLogin, 'password'>

export type TPasswordChange = {
  readonly token: string
  readonly password: string
}
