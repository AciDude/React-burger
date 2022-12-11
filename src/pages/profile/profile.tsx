import React, { useEffect } from 'react'
import style from './profile.module.css'
import { NavLink, useNavigate, Outlet, useMatch } from 'react-router-dom'
import { useDispatch } from '../../hooks'
import { logoutUser } from '../../services/actions/auth'
import { connect, disconnect } from '../../services/actions/web-socket'
import { BASE_WS_URL } from '../../utils/burger-api'
import { getCookie } from '../../utils/cookies'

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const linkClasses = `${style.link} text text_type_main-medium`
  const setActive = ({ isActive }: { isActive: boolean }): string | undefined =>
    isActive
      ? `${linkClasses} ${style.active}`
      : `${linkClasses} ${style.inactive} text_color_inactive`

  useEffect(() => {
    dispatch(connect(`${BASE_WS_URL}orders?token=${getCookie('accessToken')}`))
    return () => {
      dispatch(disconnect())
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
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={classContent}>
        <Outlet />
      </div>
    </div>
  )
}
