import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import IngredientDetails from '../../ingredient-details/ingredient-details'
import OrderDetails from '../../order-details/order-details'
import { useSelector, useDispatch } from 'react-redux'
import {
  CLEAR_MODAL_TYPE,
  CLOSE_MODAL,
  SET_MODAL_TYPE,
  OPEN_MODAL
} from '../../../services/actions/actions'
import { CLEAR_CURRENT_INGREDIENT } from '../../../services/actions/ingredient-details'
import { CLEAR_ORDER } from '../../../services/actions/order-details'

const modalRoot = document.getElementById('modal')

export default function Modal() {
  const { isOpenModal, contentType } = useSelector(state => state.switchModal)
  const order = useSelector(state => state.orderDetails.order)
  const dispatch = useDispatch()

  const a = contentType !== 'order'

  let content
  let title
  switch (contentType) {
    case 'ingredient':
      content = <IngredientDetails />
      title = 'Детали ингредиента'
      break
    case 'order':
      content = <OrderDetails />
      break
  }

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL })
    dispatch({ type: CLEAR_MODAL_TYPE })
    contentType === 'ingredient' && dispatch({ type: CLEAR_CURRENT_INGREDIENT })
    contentType === 'order' && dispatch({ type: CLEAR_ORDER })
  }

  useEffect(() => {
    if (isOpenModal) {
      const pressKey = e => e.key === 'Escape' && closeModal()
      const body = document.body
      body.addEventListener('keydown', pressKey)
      return () => {
        body.removeEventListener('keydown', pressKey)
      }
    }
    if (order) {
      dispatch({ type: SET_MODAL_TYPE, payload: 'order' })
      dispatch({ type: OPEN_MODAL })
    }
  }, [isOpenModal, order])

  return (
    isOpenModal &&
    ReactDOM.createPortal(
      <div className={style.modal}>
        <div className={style.content}>
          {title && (
            <p
              className={`${style.title} text text_type_main-large ml-10 mr-10 mt-10`}
            >
              {title}
            </p>
          )}
          {content}
          <button type="button" onClick={closeModal} className={style.button}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <ModalOverlay closeModal={closeModal} />
      </div>,
      modalRoot
    )
  )
}
