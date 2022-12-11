import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_ORDER
} from '../actions/order-details'
import { TOrder } from '../../utils/data-types'
import { TOrderDetailsActions } from '../types/order-details'

export type TOrderDetailsState = {
  readonly order: TOrder | null
  readonly orderRequest: boolean
  readonly orderFailed: boolean
}

const initialState: TOrderDetailsState = {
  order: null,
  orderRequest: false,
  orderFailed: false
}

export const orderDetailsReducer = (
  state = initialState,
  action: TOrderDetailsActions
): TOrderDetailsState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderFailed: false
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    case CLEAR_ORDER: {
      return {
        ...state,
        order: null
      }
    }
    default: {
      return state
    }
  }
}
