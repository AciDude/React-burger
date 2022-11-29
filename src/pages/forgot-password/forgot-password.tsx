import React, { useState } from 'react'
import { useForm } from '../../hooks/use-form'
import {
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './forgot-password.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { passwordResetAPI } from '../../utils/burger-api'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const location = useLocation()

  const { values, handleChange } = useForm({ email: '' })

  const [isRequest, setIsRequest] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsRequest(true)
    passwordResetAPI(values)
      .then(() =>
        navigate('/reset-password', {
          state: {
            prevPathname: location.pathname,
            request: true,
            pathname: location.state?.pathname
          }
        })
      )
      .catch(err => setIsRequest(false))
  }

  return (
    <div className={style.container}>
      <form className={style.inputs} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          onChange={handleChange}
          value={values.email}
          name={'email'}
          disabled={isRequest}
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          disabled={isRequest}
        >
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
