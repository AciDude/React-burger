import React, { useState } from 'react'
import {
  EmailInput,
  PasswordInput,
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './register.module.css'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authUser } from '../../../services/actions/auth'

export default function Register() {
  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()
  const location = useLocation()

  const [value, setValue] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    dispatch(authUser('register', value))
  }

  if (user) return <Navigate to={location.state || '/'} replace />

  return (
    <div className={style.container}>
      <form className={style.inputs} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          type="text"
          placeholder="Имя"
          onChange={onChange}
          value={value.name}
          name={'name'}
        />
        <EmailInput onChange={onChange} value={value.email} name={'email'} />
        <PasswordInput
          onChange={onChange}
          value={value.password}
          name={'password'}
        />
        <Button type="primary" size="medium" htmlType="submit">
          Зарегистрироваться
        </Button>
      </form>
      <div className={`text text_type_main-default ${style.actions}`}>
        <p>
          <span className="text_color_inactive">Уже зарегистрированы?</span>{' '}
          <Link className={style.link} to="/login" state={location.state}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
