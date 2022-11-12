import React, { useState } from 'react'
import {
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './forgot-password.module.css'
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../utils/base-url'
import { request } from '../../../utils/request'
import { useSelector } from 'react-redux'

export default function ForgotPassword() {
  const user = useSelector(state => state.auth.user)

  const navigate = useNavigate()
  const location = useLocation()

  const [value, setValue] = useState({
    email: ''
  })

  const onChange = e => setValue({ email: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(value)
    }
    request(`${BASE_URL}password-reset`, options).then(() =>
      navigate('/reset-password', {
        state: {
          prevPathname: location.pathname,
          request: true,
          pathname: location.state?.pathname
        }
      })
    )
  }

  if (user) return <Navigate to={location.state || '/'} replace />

  return (
    <div className={style.container}>
      <form className={style.inputs} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          onChange={onChange}
          value={value.email}
          name={'email'}
        />
        <Button type="primary" size="medium" htmlType="submit">
          Восстановить
        </Button>
      </form>
      <div className={`text text_type_main-default ${style.actions}`}>
        <p>
          <span className="text_color_inactive">Вспомнили пароль?</span>{' '}
          <Link className={style.link} to="/login" state={location.state}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
