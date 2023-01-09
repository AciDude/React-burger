import React from 'react'
import style from './modal-overlay.module.css'
type Props = {
  closeModal(): void
}

export default function ModalOverlay({ closeModal }: Props) {
  return (
    <div
      className={style.block}
      onClick={closeModal}
      data-testid="modal-overlay"
    ></div>
  )
}
