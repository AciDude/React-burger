import React from 'react'
import IngredientIcon from '../ingredient-icon/ingredient-icon'
import style from './ingredients-cascade.module.css'
import { TIngredients } from '../../../utils/data-types'

type TProps = {
  readonly ingredients: TIngredients
  readonly limit?: number
}

export default function IngredientCascade({ ingredients, limit = 6 }: TProps) {
  const ingredientsOnView = [...ingredients]
  ingredientsOnView.length = limit
  const extraCount = ingredients.length - limit
  return (
    <div className={style.container}>
      {ingredientsOnView.map((ingredient, index) => (
        <IngredientIcon
          alt={ingredient.name}
          key={index}
          src={ingredient.image_mobile}
          extraStyle={{ zIndex: 0 - index }}
          className={style.icon}
          count={index === ingredientsOnView.length - 1 ? extraCount : 0}
        />
      ))}
    </div>
  )
}
