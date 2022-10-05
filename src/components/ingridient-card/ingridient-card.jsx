import React from "react"
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './ingridient-card.module.css'
import PropTypes from 'prop-types'
import Modal from "../UI/modal/modal"
import IngridientDetails from "../ingridient-details/ingridient-details"
import useSwitchModal from '../hooks/useSwitchModal.js'

export default function IngridientCard({ count = 0, ...otherProps }) {
   const {image, price, name, ...propsForModal} = otherProps

   const[isModalShowed, openModal, closeModal] = useSwitchModal()

   return (
      <>
      <button type="button" className={style.card} onClick={openModal}>
         <div className={`${style.image} ml-4 mr-4 mb-1`}>
            <img src={image} alt={name} />
         </div>
         <div className={`${style.price} mb-1`}>
            <span className="text text_type_digits-default">{price} </span>
            <CurrencyIcon />
         </div>
         <div className={style.description}>
            <p className="text text_type_main-default">{name}</p>
         </div>
         {count !== 0 && (
            <div className={style.counter}>
               <Counter count={count} size={count >= 10 ? "small" : 'default'} />
            </div>
         )}
      </button>
      {isModalShowed && 
      (<Modal closeModal={closeModal} isIngridient={true}>
         <IngridientDetails name={name} {...propsForModal}/>
      </Modal>)}
      </>
   )
}

IngridientCard.propTypes = {
   image: PropTypes.string.isRequired,
   image_large: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   fat: PropTypes.number.isRequired,
   carbohydrates: PropTypes.number.isRequired,
   calories: PropTypes.number.isRequired,
   proteins: PropTypes.number.isRequired,
   count: PropTypes.number,
}