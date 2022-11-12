import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_ORDER
} from '../actions/order-details'

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false
}

export const orderDetailsReducer = (state = initialState, action) => {
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
        order: { name: action.order.name, number: action.order.order.number },
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
