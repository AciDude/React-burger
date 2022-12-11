import React from 'react'
import style from './orders-status.module.css'

type TProps = {
  readonly statusArray: ReadonlyArray<Array<number | never>>
  readonly total: number
  readonly totalToday: number
}

export default function OrdersStatus({
  statusArray,
  total,
  totalToday
}: TProps) {
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
