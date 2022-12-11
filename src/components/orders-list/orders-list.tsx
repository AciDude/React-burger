import React from 'react'
import style from './orders-list.module.css'
import OrderCard from '..//order-cart/order-card'
import { TOrder } from '../../utils/data-types'

type TProps = {
  readonly statusShowed?: boolean
  readonly orders: ReadonlyArray<TOrder>
}

export default function OrdersList({ statusShowed = false, orders }: TProps) {
  return (
    <div className={`${style.container}`}>
      {orders &&
        [...orders]
          .sort((a, b) => b.number - a.number)
          .map(order => (
            <OrderCard
              key={order._id}
              order={order}
              statusShowed={statusShowed}
            />
          ))}
    </div>
  )
}
