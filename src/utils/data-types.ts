type TIngredient = {
  readonly _id: string
  readonly name: string
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

export type TIngredientBun = TIngredient & {
  readonly type: 'bun'
}
export type TIngredientMain = TIngredient & {
  readonly type: 'main'
  readonly dragId?: string
}
export type TIngredientSauce = TIngredient & {
  readonly type: 'sauce'
  readonly dragId?: string
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
  readonly ingredients: ReadonlyArray<string>
  readonly _id: string
  readonly status: string
  readonly name: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly number: number
  readonly owner?: TOwner | string
  readonly price?: number
}

export type TWSResponse = {
  readonly success: boolean
  readonly orders: ReadonlyArray<TOrder>
  readonly total: number
  readonly totalToday: number
}

export type TUser = {
  readonly email: string
  readonly name: string
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

export type TResponseBody<TExtraResponseBody = {}> = TExtraResponseBody & {
  readonly success: boolean
  readonly message?: string
  readonly headers?: Headers
}

export interface CustomBody<T extends any> extends Body {
  json(): Promise<T>
}

export interface CustomResponse<T> extends CustomBody<T> {
  readonly headers: Headers
  readonly ok: boolean
  readonly redirected: boolean
  readonly status: number
  readonly statusText: string
  readonly type: ResponseType
  readonly url: string
  clone(): Response
}

export type TTokens = {
  readonly accessToken: string
  readonly refreshToken: string
}
