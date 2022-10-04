import React from "react";
import style from './ingridient-details.module.css'

export default function IngridientDetails({ name, image_large, fat, carbohydrates, calories, proteins }) {

   return (
      <div className={`${style.block} ml-10 mr-10 mb-15`}>
         <div className="mb-4">
            <img src={image_large} alt={name} />
         </div>
         <p className="text text_type_main-medium mb-8">{name}</p>
         <ul className={`${style.list} text text_color_inactive`}>
            <li className={style.listItem}>
               <span className="text_type_main-default">Калории, ккал</span>
               <span className="text_type_digits-default">{calories}</span>
            </li>
            <li className={style.listItem}>
               <span className="text_type_main-default">Белки, г</span>
               <span className="text_type_digits-default">{proteins}</span>
            </li>
            <li className={style.listItem}>
               <span className="text_type_main-default">Жиры, г</span>
               <span className="text_type_digits-default">{fat}</span>
            </li>
            <li className={style.listItem}>
               <span className="text_type_main-default">Углеводы, г</span>
               <span className="text_type_digits-default">{carbohydrates}</span>
            </li>
         </ul>
      </div>
   )
}