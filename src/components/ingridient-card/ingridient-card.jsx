import React from "react";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './ingridient-card.module.css'
import PropTypes from 'prop-types'
import { ingridientPropTypes } from '../../utils/prop-types.js'

export default function IngridientCard({ ingridient, count = 0 }) {

   return (
      <button type="button" className={style.card}>
         <div className={`${style.image} ml-4 mr-4 mb-1`}>
            <img src={ingridient.image} alt={ingridient.name} />
         </div>
         <div className={`${style.price} mb-1`}>
            <span className="text text_type_digits-default">{ingridient.price} </span>
            <CurrencyIcon />
         </div>
         <div className={style.description}>
            <p className="text text_type_main-default">{ingridient.name}</p>
         </div>
         {count !== 0 && (
            <div className={style.counter}>
               <Counter count={count} size={count >= 10 ? "small" : 'default'} />
            </div>
         )}
      </button>
   )
}

IngridientCard.propTypes = {
   ingridient: ingridientPropTypes().isRequired,
   count: PropTypes.number,
}