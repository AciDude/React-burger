import React from 'react'
import style from './ingredient-details.module.css'
import { useSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import LoadedImage from '../UI/loaded-image/loaded-image'
import ClipLoader from 'react-spinners/ClipLoader'
import { selectIngredient } from '../../services/selectors'

type TProp = {
  readonly title?: string
}

export default function IngredientDetails({ title = '' }: TProp) {
  const { ingredientId } = useParams()
  const ingredients = useSelector(selectIngredient)
  const currentIngredient = ingredients.find(
    ingredient => ingredient._id === ingredientId
  )
  if (!currentIngredient) return null
  return (
    <div className={`${style.block} ml-10 mr-10 mb-15`}>
      {title && <p className="text text_type_main-large mt-30">{title}</p>}
      <div className={`${style.image} mb-4`}>
        <LoadedImage
          src={currentIngredient.image_large}
          alt={currentIngredient.name}
          preloader={<ClipLoader color="#f04ab9" size="100px" />}
        />
      </div>
      <p className="text text_type_main-medium mb-8">
        {currentIngredient.name}
      </p>
      <ul className={`${style.list} text text_color_inactive`}>
        <li className={style.listItem}>
          <span className="text_type_main-default">Калории,ккал</span>
          <span className="text_type_digits-default">
            {currentIngredient.calories}
          </span>
        </li>
        <li className={style.listItem}>
          <span className="text_type_main-default">Белки, г</span>
          <span className="text_type_digits-default">
            {currentIngredient.proteins}
          </span>
        </li>
        <li className={style.listItem}>
          <span className="text_type_main-default">Жиры, г</span>
          <span className="text_type_digits-default">
            {currentIngredient.fat}
          </span>
        </li>
        <li className={style.listItem}>
          <span className="text_type_main-default">Углеводы, г</span>
          <span className="text_type_digits-default">
            {currentIngredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  )
}
