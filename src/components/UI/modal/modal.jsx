import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { useSelector } from 'react-redux'

const modalRoot = document.getElementById('modal')

export default function Modal({ children, title, closeModal }) {
  const { isOpenModal } = useSelector(state => state.switchModal)

  useEffect(() => {
    if (isOpenModal) {
      const pressKey = e => e.key === 'Escape' && closeModal()
      const body = document.body
      body.addEventListener('keydown', pressKey)
      return () => {
        body.removeEventListener('keydown', pressKey)
      }
    }
  }, [isOpenModal])

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
          {children}
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
