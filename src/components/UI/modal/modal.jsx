import React, { useEffect } from "react"
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay"
import PropTypes from 'prop-types'

const modalRoot = document.getElementById('modal')

export default function Modal({ children, closeModal, title = false, isOpen }) {

   useEffect(() => {
      if (isOpen) {
         const pressKey = e => e.key === 'Escape' && closeModal()
         const body = document.body
         body.addEventListener('keydown', pressKey)
         return () => {
            body.removeEventListener('keydown', pressKey)
         }
      }
   }, [isOpen])

   return isOpen && ReactDOM.createPortal(
      <div className={style.modal}>
         <div className={style.content}>
            {title && (
               <p className={`${style.title} text text_type_main-large ml-10 mr-10 mt-10`}>{title}</p>
            )}
            {children}
            <button
               type="button"
               onClick={closeModal}
               className={style.button}
            ><CloseIcon type="primary" />
            </button>
         </div>
         <ModalOverlay closeModal={closeModal} />
      </div>,
      modalRoot
   )
}

Modal.propTypes = {
   children: PropTypes.node.isRequired,
   closeModal: PropTypes.func.isRequired,
   title: PropTypes.string,
   isOpen: PropTypes.bool.isRequired,
}