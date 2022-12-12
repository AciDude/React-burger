import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  CLEAR_ORDER
} from '../actions/order-details'
import { TOrder } from '../../utils/data-types'

export type TGetOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST
}
export type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS
  readonly order: TOrder
}
export type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED
}
export type TClearOrderAction = {
  readonly type: typeof CLEAR_ORDER
}

export type TOrderDetailsActions =
  | TGetOrderRequestAction
  | TGetOrderSuccessAction
  | TGetOrderFailedAction
  | TClearOrderAction
