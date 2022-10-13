import React from "react"
import { CurrencyIcon, Counter } 
   from '@ya.praktikum/react-developer-burger-ui-components'
import style from './ingredient-card.module.css'
import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/prop-types.js'
import IngredientDetails from "../ingredient-details/ingredient-details"

export default function IngredientCard({ count = 0, ingredient, openModal }) {

   const onClick = () => openModal(<IngredientDetails ingredient={ingredient} />, 'Детали ингредиента')

   return (
      <button type="button" className={style.card} onClick={onClick}>
         <div className={`${style.image} ml-4 mr-4 mb-1`}>
            <img src={ingredient.image} alt={ingredient.name} />
         </div>
         <div className={`${style.price} mb-1`}>
            <span className="text text_type_digits-default">{ingredient.price} </span>
            <CurrencyIcon />
         </div>
         <div className={style.description}>
            <p className="text text_type_main-default">{ingredient.name}</p>
         </div>
         {count !== 0 && (
            <div className={style.counter}>
               <Counter count={count} size={count >= 10 ? "small" : 'default'} />
            </div>
         )}
      </button>
   )
}

IngredientCard.propTypes = {
   count: PropTypes.number,
   ingredient: ingredientPropTypes().isRequired,
   openModal: PropTypes.func.isRequired,
}