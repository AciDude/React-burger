import React from 'react'
import style from './order-details.module.css'
import image from '../../image/done.png'
import { useSelector } from '../../hooks'
import { selectOrder } from '../../services/selectors'

export default function OrderDetails() {
  const order = useSelector(selectOrder)
  return (
    order && (
      <div className={`${style.block} mt-30 mb-30 ml-25 mr-25`}>
        <p
          className={`${style.number} text text_type_digits-large mb-8`}
          data-testid="order-details-number"
        >
          {order.number}
        </p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img src={image} alt="Готово" className={`${style.image} mb-15`} />
        <p className="text text_type_main-default mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    )
  )
}
