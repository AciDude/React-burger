import React from 'react'
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './ingredient-card.module.css'
import { useDrag } from 'react-dnd'
import { useLocation, useNavigate } from 'react-router-dom'
import LoadedImage from '../UI/loaded-image/loaded-image'
import ClipLoader from 'react-spinners/ClipLoader'
import {
  TIngredientBun,
  TIngredientMain,
  TIngredientSauce
} from '../../utils/data-types'

type TProps = {
  ingredient: Readonly<TIngredientBun | TIngredientMain | TIngredientSauce>
  count?: number
}

export default function IngredientCard({ ingredient, count = 0 }: TProps) {
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
        <LoadedImage
          src={ingredient.image}
          alt={ingredient.name}
          preloader={<ClipLoader color="#f04ab9" size="100px" />}
        />
      </div>
      <div className={`${style.price} mb-1`}>
        <span className="text text_type_digits-default">
          {ingredient.price}{' '}
        </span>
        <CurrencyIcon type="primary" />
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
