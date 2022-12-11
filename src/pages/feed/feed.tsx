import React, { useEffect } from 'react'
import style from './feed.module.css'
import { useSelector, useDispatch } from '../../hooks'
import {
  connectAllOrders,
  disconnectAllOrders
} from '../../services/actions/ws-all-orders'
import { BASE_WS_URL } from '../../utils/burger-api'
import OrdersList from '../../components/orders-list/orders-list'
import OrdersStatus from '../../components/orders-status/orders-status'
import { selectAllOrders } from '../../services/selectors'

export default function Feed() {
  const orders = useSelector(selectAllOrders)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(connectAllOrders(`${BASE_WS_URL}orders/all`))
    return () => {
      dispatch(disconnectAllOrders())
    }
  }, [dispatch])

  return (
    <div className={`${style.container}`}>
      <p className="mb-5 mt-10 text text_type_main-large">Лента заказов</p>
      <div className={`${style.content}`}>
        <div className={style.list}>
          {orders && <OrdersList orders={orders} />}
        </div>
        <div className={style.details}>
          {' '}
          <OrdersStatus />
        </div>
      </div>
    </div>
  )
}
