import React from 'react'
import style from './ingredient-details.module.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function IngredientDetails({ title = '' }) {
  const { ingredientId } = useParams()
  const ingredient = useSelector(state =>
    state.burgerIngredients.ingredients.find(
      ingredient => ingredient._id === ingredientId
    )
  )
  if (!ingredient) return null
  return (
    <div className={`${style.block} ml-10 mr-10 mb-15`}>
      <p className="text text_type_main-large mt-30">{title}</p>
      <div className={`${style.image} mb-4`}>
        <img src={ingredient.image_large} alt={ingredient.name} />
      </div>
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <ul className={`${style.list} text text_color_inactive`}>
        <li className={style.listItem}>
          <span className="text_type_main-default">Калории,ккал</span>
          <span className="text_type_digits-default">
            {ingredient.calories}
          </span>
        </li>
        <li className={style.listItem}>
          <span className="text_type_main-default">Белки, г</span>
          <span className="text_type_digits-default">
            {ingredient.proteins}
          </span>
        </li>
        <li className={style.listItem}>
          <span className="text_type_main-default">Жиры, г</span>
          <span className="text_type_digits-default">{ingredient.fat}</span>
        </li>
        <li className={style.listItem}>
          <span className="text_type_main-default">Углеводы, г</span>
          <span className="text_type_digits-default">
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  title: PropTypes.string
}
