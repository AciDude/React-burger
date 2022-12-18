import React, { useEffect, FC, PropsWithChildren, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'

const modalRoot = document.getElementById('modal')

type Props = {
  title?: string
  closeModal(): void
  children: ReactNode
}

const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  closeModal
}) => {
  useEffect(() => {
    const pressKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal()
    const body = document.body
    body.addEventListener('keydown', pressKey)
    return () => {
      body.removeEventListener('keydown', pressKey)
    }
  }, [closeModal])

  return ReactDOM.createPortal(
    <div className={style.modal} data-testid="modal">
      <div className={style.content}>
        {title && (
          <p
            className={`${style.title} text text_type_main-large ml-10 mr-10 mt-10`}
          >
            {title}
          </p>
        )}
        {children}
        <button
          type="button"
          onClick={closeModal}
          className={style.button}
          data-testid="modal-close-button"
        >
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay closeModal={closeModal} />
    </div>,
    modalRoot as Element
  )
}

export default Modal
