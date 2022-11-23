import React from 'react'
import { useForm } from '../../hooks/use-form'
import {
  EmailInput,
  PasswordInput,
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './register.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../services/actions/auth'
import { selectRegisterRequest } from '../../services/selectors'

export default function Register() {
  const registerRequest = useSelector(selectRegisterRequest)
  const dispatch = useDispatch()
  const location = useLocation()

  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: ''
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch<any>(registerUser(values))
  }

  return (
    <div className={style.container}>
      <form className={style.inputs} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleChange}
          value={values.name}
          name={'name'}
          disabled={registerRequest}
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          disabled={registerRequest}
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          disabled={registerRequest}
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          disabled={registerRequest}
        >
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
