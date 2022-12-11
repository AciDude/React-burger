import React from 'react'
import style from './orders-list.module.css'
import OrderCard from '..//order-cart/order-card'
import { useSelector } from '../../hooks'

type TProps = {
  readonly statusShowed?: boolean
}

export default function OrdersList({ statusShowed = false }: TProps) {
  const orders = useSelector(state => state.websocket.data?.orders)
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
