import React from 'react'
import style from './orders-status.module.css'
import { useSelector } from '../../hooks'
import {
  selectAllOrders,
  selectTotal,
  selectTotalToday
} from '../../services/selectors'

export default function OrdersStatus() {
  const orders = useSelector(selectAllOrders)
  const total = useSelector(selectTotal)
  const totalToday = useSelector(selectTotalToday)

  let statusArray: ReadonlyArray<Array<number | never>> = [[], []]

  if (orders) {
    statusArray = orders.reduce(
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
    <div className={`${style.container} text`}>
      <div className={`${style.status_container} text_type_main-medium`}>
        <div className={`${style.status}`}>
          <p className={`${style.title} mb-6`}>Готовы:</p>
          <ul className={`${style.list}`}>
            {statusArray[0].map((number, index) => (
              <li
                className={`${style.done} text_type_digits-default`}
                key={index}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${style.status}`}>
          <p className={`${style.title} mb-6`}>В работе:</p>
          <ul className={`${style.list}`}>
            {statusArray[1].map((number, index) => (
              <li
                className={`${style.pending} text_type_digits-default`}
                key={index}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p className="text_type_main-medium">Выполнено за все время:</p>
        <p className="text_type_digits-large">{total}</p>
      </div>
      <div>
        <p className="text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  )
}
