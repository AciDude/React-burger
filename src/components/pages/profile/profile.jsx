import React from 'react'
import style from './profile.module.css'
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom'
import Person from '../person/person'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../services/actions/auth'

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const linkClasses = `${style.link} text text_type_main-medium`
  const setActive = ({ isActive }) =>
    isActive
      ? `${linkClasses} ${style.active}`
      : `${linkClasses} ${style.inactive} text_color_inactive`

  const onClick = () => {
    dispatch(logoutUser())
    navigate('/')
  }
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
      <div className={style.content}>
        <Routes>
          <Route index element={<Person />} />
        </Routes>
      </div>
    </div>
  )
}
