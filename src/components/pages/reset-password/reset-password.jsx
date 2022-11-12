import React, { useState } from 'react'
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './reset-password.module.css'
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../utils/base-url'
import { request } from '../../../utils/request'

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()

  const [value, setValue] = useState({
    token: '',
    password: ''
  })
  const [inputType, setInputType] = useState({
    type: 'password',
    icon: 'ShowIcon'
  })

  const toggleInputType = () =>
    setInputType(
      inputType.type === 'password'
        ? {
            type: 'text',
            icon: 'HideIcon'
          }
        : {
            type: 'password',
            icon: 'ShowIcon'
          }
    )

  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(value)
    }
    request(`${BASE_URL}password-reset/reset`, options).then(() =>
      navigate('/login', {
        state: location.state
      })
    )
  }

  if (
    location.state?.prevPathname !== '/forgot-password' &&
    !location.state?.request
  )
    return <Navigate to="/forgot-password" replace />

  return (
    <div className={style.container}>
      <form className={style.inputs} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          type={inputType.type}
          placeholder="Введите новый пароль"
          onChange={onChange}
          value={value.password}
          name={'password'}
          icon={inputType.icon}
          onIconClick={toggleInputType}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={onChange}
          value={value.token}
          name={'token'}
        />
        <Button type="primary" size="medium" htmlType="submit">
          Сохранить
        </Button>
      </form>
      <div className={`text text_type_main-default ${style.actions}`}>
        <p>
          <span className="text_color_inactive">Вспомнили пароль?</span>{' '}
          <Link className={style.link} to="/login" state={location.state}>
            Войти
          </Link>
        </p>
        <p>
          <span className="text_color_inactive">Забыли пароль?</span>{' '}
          <Link
            className={style.link}
            to="/forgot-password"
            state={location.state}
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  )
}
