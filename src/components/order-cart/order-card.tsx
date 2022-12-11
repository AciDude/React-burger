import React from 'react'
import style from './order-card.module.css'
import { Link, useLocation } from 'react-router-dom'
import {
  TOrder,
  TIngredientBun,
  TIngredientMain,
  TIngredientSauce
} from '../../utils/data-types'
import { useSelector } from '../../hooks'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCascade from '../UI/ingredients-cascade/ingredients-cscade'
import { getDate, getStatusText } from '../../utils'

type TProps = {
  readonly order: TOrder
  readonly statusShowed?: boolean
}

export default function OrderCard({ order, statusShowed = false }: TProps) {
  const location = useLocation()
  const allIngredients = useSelector(
    state => state.burgerIngredients.ingredients
  )

  const ingredients = order.ingredients.map(id => {
    const ingredient = allIngredients.find(item => item._id === id)
    return ingredient as TIngredientBun | TIngredientMain | TIngredientSauce
  })

  const total = ingredients.reduce(
    (acc, ingredient) => (ingredient ? ingredient.price + acc : acc),
    0
  )

  const [dateInfo, createdTime] = getDate(order.createdAt)

  const statusText = getStatusText(order.status)

  return (
    <Link
      to={`${order.number}`}
      state={{ background: location.pathname }}
      className={`${style.container} p-6`}
    >
      <div className={style.top}>
        <p
          className={`${style.number} text text_type_digits-default`}
        >{`#${order.number}`}</p>
        <p
          className={`${style.date} text text_type_main-default  text_color_inactive`}
        >{`${dateInfo}, ${createdTime}`}</p>
      </div>
      <div className={style.name}>
        <p className={`${style.title} text text_type_main-medium`}>
          {order.name}
        </p>
        {statusShowed && (
          <p
            className={`text text_type_main-default ${
              order.status === 'done' ? style.done : ''
            }`}
          >
            {statusText}
          </p>
        )}
      </div>
      <div className={style.bottom}>
        <IngredientCascade ingredients={ingredients} />
        <p className={`${style.total} text text_type_digits-default`}>
          {total} <CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  )
}
