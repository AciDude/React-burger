import React from 'react'
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './ingredient-card.module.css'
import { ingredientPropTypes } from '../../utils/prop-types'
import { useDrag } from 'react-dnd'
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function IngredientCard({ ingredient, count = 0 }) {
  const location = useLocation()
  const navigate = useNavigate()

  const ingredientId = ingredient._id

  const onClick = () => {
    navigate(`/ingredients/${ingredientId}`, {
      state: { background: location }
    })
  }

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <button
      key={ingredientId}
      ref={dragRef}
      type="button"
      className={style.card}
      onClick={onClick}
      style={{ opacity }}
    >
      <div className={`${style.image} ml-4 mr-4 mb-1`}>
        <img src={ingredient.image} alt={ingredient.name} />
      </div>
      <div className={`${style.price} mb-1`}>
        <span className="text text_type_digits-default">
          {ingredient.price}{' '}
        </span>
        <CurrencyIcon />
      </div>
      <div className={style.description}>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </div>
      {count !== 0 && (
        <div className={style.counter}>
          <Counter count={count} size={count >= 10 ? 'small' : 'default'} />
        </div>
      )}
    </button>
  )
}

IngredientCard.propTypes = {
  ingredient: ingredientPropTypes().isRequired,
  count: PropTypes.number
}
