import React from 'react'
import style from './modal-overlay.module.css'
import PropTypes from 'prop-types'


export default function ModalOverlay({ closeModal }) {

    return (<div className={style.block} onClick={closeModal}></div>)
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
}