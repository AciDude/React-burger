import React from "react"
import style from './ingridient-details.module.css'
import { ingridientPropTypes } from '../../utils/prop-types.js'

export default function IngridientDetails({ ingridient }) {

   return (
      <div className={`${style.block} ml-10 mr-10 mb-15`}>
         <div className={`${style.image} mb-4`}>
            <img src={ingridient.image_large} alt={ingridient.name} />
         </div>
         <p className="text text_type_main-medium mb-8">{ingridient.name}</p>
         <ul className={`${style.list} text text_color_inactive`}>
            <li className={style.listItem}>
               <span className="text_type_main-default">Калории,ккал</span>
               <span className="text_type_digits-default">{ingridient.calories}</span>
            </li>
            <li className={style.listItem}>
               <span className="text_type_main-default">Белки, г</span>
               <span className="text_type_digits-default">{ingridient.proteins}</span>
            </li>
            <li className={style.listItem}>
               <span className="text_type_main-default">Жиры, г</span>
               <span className="text_type_digits-default">{ingridient.fat}</span>
            </li>
            <li className={style.listItem}>
               <span className="text_type_main-default">Углеводы, г</span>
               <span className="text_type_digits-default">{ingridient.carbohydrates}</span>
            </li>
         </ul>
      </div>
   )
}

IngridientDetails.propTypes = {
   ingridient: ingridientPropTypes().isRequired,
}