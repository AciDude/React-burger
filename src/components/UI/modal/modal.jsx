import React from "react";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './modal.module.css'

const modalRoot = document.getElementById('root')

export default function Modal({ children, handlerModal }) {

   return ReactDOM.createPortal(
      <div className={style.modal}>
         {children}
         <button
            type="button"
            onClick={handlerModal}
            className={style.button}
         ><CloseIcon type="primary" /></button>
      </div>,
      modalRoot
   )
}