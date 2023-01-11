import React, { useEffect } from 'react'
import style from './profile.module.css'
import {
  NavLink,
  useNavigate,
  useMatch,
  Route,
  Routes
} from 'react-router-dom'
import { useDispatch, useSelector } from '../../hooks'
import { logoutUser, getUser } from '../../services/actions/auth'
import {
  connectUsersOrders,
  disconnectUsersOrders
} from '../../services/actions/ws-users-orders'
import { BASE_WS_URL } from '../../utils/burger-api'
import { getCookie } from '../../utils/cookies'
import OrdersList from '../../components/orders-list/orders-list'
import { selectUsersOrders } from '../../services/selectors'
import Person from '../person/person'

export default function Profile() {
  const orders = useSelector(selectUsersOrders)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const linkClasses = `${style.link} text text_type_main-medium`
  const setActive = ({ isActive }: { isActive: boolean }): string | undefined =>
    isActive
      ? `${linkClasses} ${style.active}`
      : `${linkClasses} ${style.inactive} text_color_inactive`

  useEffect(() => {
    dispatch(getUser())
    dispatch(
      connectUsersOrders(
        `${BASE_WS_URL}orders?token=${getCookie('accessToken')}`
      )
    )
    return () => {
      dispatch(disconnectUsersOrders())
    }
  }, [dispatch])

  const onClick = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  const matchPath = useMatch({
    path: '/profile/orders',
    end: false
  })

  const classContent = matchPath ? style.list : style.form

  const descriptionText = `В этом разделе вы можете ${
    matchPath
      ? 'просмотреть свою историю заказов'
      : 'изменить свои персональные данные'
  }`

  return (
    <div className={style.container}>
      <div className={style.menu}>
        <ul className={`t${style.list} mb-20`}>
          <li>
            <NavLink to="" className={setActive} end>
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink to="orders" className={setActive}>
              История заказов
            </NavLink>
          </li>
          <li>
            <button
              className={`${style.button} ${style.inactive} text text_type_main-medium text_color_inactive`}
              type="button"
              onClick={onClick}
            >
              Выход
            </button>
          </li>
        </ul>
        <p
          className={`text text_type_main-default text_color_inactive ${style.description}`}
        >
          {descriptionText}
        </p>
      </div>
      <div className={classContent}>
        <Routes>
          <Route index element={<Person />} />
          {orders && (
            <Route
              path="orders"
              element={<OrdersList orders={orders} statusShowed={true} />}
            />
          )}
        </Routes>
      </div>
    </div>
  )
}
