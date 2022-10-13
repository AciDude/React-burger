import React from "react"
import style from './ingredient-details.module.css'
import { ingredientPropTypes } from '../../utils/prop-types.js'

export default function IngredientDetails({ ingredient }) {

   return (
      <div className={`${style.block} ml-10 mr-10 mb-15`}>
         <div className={`${style.image} mb-4`}>
            <img src={ingredient.image_large} alt={ingredient.name} />
         </div>
         <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
         <ul className={`${style.list} text text_color_inactive`}>
            <li className={style.listItem}>
               <span className="text_type_main-default">Калории,ккал</span>
               <span className="text_type_digits-default">{ingredient.calories}</span>
            </li>
            <li className={style.listItem}>
               <span className="text_type_main-default">Белки, г</span>
               <span className="text_type_digits-default">{ingredient.proteins}</span>
            </li>
            <li className={style.listItem}>
               <span className="text_type_main-default">Жиры, г</span>
               <span className="text_type_digits-default">{ingredient.fat}</span>
            </li>
            <li className={style.listItem}>
               <span className="text_type_main-default">Углеводы, г</span>
               <span className="text_type_digits-default">{ingredient.carbohydrates}</span>
            </li>
         </ul>
      </div>
   )
}

IngredientDetails.propTypes = {
   ingredient: ingredientPropTypes().isRequired,
}