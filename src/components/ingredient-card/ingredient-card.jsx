import React from 'react'
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './ingredient-card.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { OPEN_MODAL, SET_MODAL_TYPE } from '../../services/actions/actions'
import { SET_CURRENT_INGREDIENT } from '../../services/actions/ingredient-details'
import { ingredientPropTypes } from '../../utils/prop-types'
import { useDrag } from 'react-dnd'

export default function IngredientCard({ ingredient, count = 0 }) {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch({ type: SET_CURRENT_INGREDIENT, ingredient })
    dispatch({ type: SET_MODAL_TYPE, payload: 'ingredient' })
    dispatch({ type: OPEN_MODAL })
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
      ref={dragRef}
      type="button"
      className={style.card}
      onClick={onClick}
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
  ingredient: ingredientPropTypes().isRequired
}
