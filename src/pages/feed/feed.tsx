import React, { useEffect } from 'react'
import style from './feed.module.css'
import { useSelector, useDispatch } from '../../hooks'
import { connect, disconnect } from '../../services/actions/web-socket'
import { BASE_WS_URL } from '../../utils/burger-api'
import OrdersList from '../../components/orders-list/orders-list'
import OrdersStatus from '../../components/orders-status/orders-status'

export default function Feed() {
  const orders = useSelector(state => state.websocket.data?.orders)
  const total = useSelector(state => state.websocket.data?.total)
  const totalToday = useSelector(state => state.websocket.data?.totalToday)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(connect(`${BASE_WS_URL}orders/all`))
    return () => {
      dispatch(disconnect())
    }
  }, [dispatch])

  let statusList: ReadonlyArray<Array<number | never>> = [[], []]

  if (orders) {
    statusList = orders.reduce(
      (acc: ReadonlyArray<Array<number | never>>, item) => {
        item.status === 'done' && acc[0].length < 10 && acc[0].push(item.number)
        item.status === 'pending' &&
          acc[1].length < 10 &&
          acc[1].push(item.number)
        return acc
      },
      [[], []]
    )
  }

  return (
    <div className={`${style.container}`}>
      <p className="mb-5 mt-10 text text_type_main-large">Лента заказов</p>
      <div className={`${style.content}`}>
        <div className={style.list}>
          <OrdersList />
        </div>
        <div className={style.details}>
          {total && totalToday && (
            <OrdersStatus
              statusArray={statusList}
              total={total}
              totalToday={totalToday}
            />
          )}
        </div>
      </div>
    </div>
  )
}
