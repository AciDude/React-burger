import React, { useEffect, useState } from 'react'
import style from './order-info.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from '../../hooks'
import {
  TIngredientBun,
  TIngredientMain,
  TIngredientSauce,
  TOrder
} from '../../utils/data-types'
import IngredientIcon from '../UI/ingredient-icon/ingredient-icon'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { getDate, getStatusText } from '../../utils'
import { getOrderByNumber } from '../../utils/burger-api'

type TIngredientsWithCount =
  | (TIngredientBun & {
      count: number
    })
  | (TIngredientMain & {
      count: number
    })
  | (TIngredientSauce & {
      count: number
    })

type TProps = {
  readonly isModal?: boolean
}

type TState =
  | (TOrder & {
      owner?: string
      count?: number
    })
  | null

export default function OrderInfo({ isModal = false }: TProps) {
  const params = useParams()
  const orders = useSelector(state => state.websocket.data?.orders)
  const allIngredients = useSelector(
    state => state.burgerIngredients.ingredients
  )
  const [state, setState] = useState<TState>(null)

  useEffect(() => {
    if (!state) {
      if (orders) {
        let order = orders.find(item => item.number === Number(params.id))
        order && setState(order)
      }
      if (params.id && !orders)
        getOrderByNumber(params.id).then(res => {
          setState(res.orders[0])
        })
    }
  }, [])

  if (state) {
    const ingredients = state.ingredients.map(id => {
      const ingredient = allIngredients.find(item => item._id === id)
      return ingredient as TIngredientBun | TIngredientMain | TIngredientSauce
    })

    const total = ingredients.reduce(
      (acc, ingredient) => (ingredient ? ingredient.price + acc : acc),
      0
    )

    const [dateInfo, createdTime] = getDate(state.createdAt)

    const uniqueIngredients = ingredients.reduce(
      (acc: Array<TIngredientsWithCount>, ingredient) => {
        const includes = acc.find(item => item._id === ingredient._id)
        includes ? includes.count++ : acc.push({ ...ingredient, count: 1 })
        return acc
      },
      []
    )

    const statusText = getStatusText(state.status)
    const classStatus = state.status === 'done' ? style.done : ''

    const classesContainer = [style.container]
    isModal && classesContainer.push(style.modal)

    return (
      <div className={`${classesContainer.join(' ')} text`}>
        <p className={`${style.number} text_type_digits-default mb-5`}>
          {`#${state.number}`}
        </p>
        <p className="text_type_main-medium mb-3">{state.name}</p>
        <p className={`${classStatus} text_type_main-default mb-15`}>
          {statusText}
        </p>
        <p className="text_type_main-medium mb-6">Состав:</p>
        <ul className={`${style.list} mb-10 pr-8`}>
          {uniqueIngredients.map(item => (
            <li className={`${style.ingredient}`} key={item._id}>
              <IngredientIcon src={item.image_mobile} alt={item.name} />
              <p
                className={`${style.ingredient_name} text_type_main-default ml-4`}
              >
                {item.name}
              </p>
              <p
                className={`${style.ingredient_price} text_type_digits-default`}
              >
                {`${item.count} x ${item.price}`}{' '}
                <CurrencyIcon type="primary" />
              </p>
            </li>
          ))}
        </ul>
        <div className={`${style.bottom}`}>
          <p
            className={`${style.data} text_type_main-default text_color_inactive`}
          >{`${dateInfo}, ${createdTime}`}</p>
          <p className={`${style.total} text_type_digits-default`}>
            {total} <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    )
  }
  return null
}
