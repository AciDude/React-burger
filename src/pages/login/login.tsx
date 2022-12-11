import React from 'react'
import { useForm } from '../../hooks/use-form'
import { Link, useLocation } from 'react-router-dom'
import {
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './login.module.css'
import { useDispatch, useSelector } from '../../hooks'
import { loginUser } from '../../services/actions/auth'
import { selectLoginRequest } from '../../services/selectors'

export default function Login() {
  const loginRequest = useSelector(selectLoginRequest)
  const location = useLocation()
  const dispatch = useDispatch()

  const { values, handleChange } = useForm({
    email: '',
    password: ''
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUser(values))
  }

  return (
    <div className={style.container}>
      <form className={style.inputs} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Вход</p>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          disabled={loginRequest}
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          disabled={loginRequest}
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          disabled={loginRequest}
        >
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
