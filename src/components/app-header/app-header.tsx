import React from 'react'
import style from './app-header.module.css'
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useMatch, Link } from 'react-router-dom'
import { useSelector } from '../../hooks'
import { selectUserName } from '../../services/selectors'

const AppHeader = React.memo(function () {
  const name = useSelector(selectUserName)
  const constructorMatchPath = useMatch({
    path: '/',
    end: true
  })
  const ordersMatchPath = useMatch({
    path: '/feed',
    end: false
  })
  const profileMatchPath = useMatch({
    path: '/profile',
    end: false
  })

  const setType = (obj: object | null): 'primary' | 'secondary' =>
    obj ? 'primary' : 'secondary'

  const classesArray = [
    'pl-5',
    'pr-5',
    'pb-4',
    'pt-4',
    'text',
    'text_type_main-default',
    'text_color_inactive',
    style.button,
    style.inactive
  ]
  const classes = classesArray.join(' ')

  const setActive = ({ isActive }: { isActive: boolean }): string | undefined =>
    isActive ? `${classes} ${style.active}` : `${classes} ${style.inactive}`

  return (
    <header className={`${style.header} pt-4 pb-4`}>
      <div className={style.container}>
        <nav>
          <ul className={style.list}>
            <li className="ml-2">
              <NavLink to="/" className={setActive} end={true}>
                <BurgerIcon type={setType(constructorMatchPath)} />
                <span className="ml-2">Конструктор</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/feed" className={setActive}>
                <ListIcon type={setType(ordersMatchPath)} />
                <span className="ml-2">Лента заказов</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={style.profile}>
          <Link
            to="/profile/orders"
            className={setActive({ isActive: Boolean(profileMatchPath) })}
          >
            <ProfileIcon type={setType(profileMatchPath)} />
            <span className="ml-2">{name || 'Личный кабинет'}</span>
          </Link>
        </div>
      </div>
    </header>
  )
})

export default AppHeader
