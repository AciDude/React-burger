import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './login.module.css'
import { useDispatch } from 'react-redux'
import { authUser } from '../../../services/actions/auth'

export default function Login() {
  const location = useLocation()
  const dispatch = useDispatch()

  const [value, setValue] = useState({
    email: '',
    password: ''
  })

  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    dispatch(authUser('login', value))
  }

  return (
    <div className={style.container}>
      <form className={style.inputs} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Вход</p>
        <EmailInput onChange={onChange} value={value.email} name={'email'} />
        <PasswordInput
          onChange={onChange}
          value={value.password}
          name={'password'}
        />
        <Button type="primary" size="medium" htmlType="submit">
          Войти
        </Button>
      </form>
      <div className={`text text_type_main-default ${style.actions}`}>
        <p>
          <span className="text_color_inactive">Вы — новый пользователь?</span>{' '}
          <Link className={style.link} to="/register" state={location.state}>
            Зарегистрироваться
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
