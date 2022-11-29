import React, { useState } from 'react'
import { useForm } from '../../hooks/use-form'
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './reset-password.module.css'
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { passwordChangeAPI } from '../../utils/burger-api'

type THidden = {
  type: 'text'
  icon: 'HideIcon'
}

type TShow = {
  type: 'password'
  icon: 'ShowIcon'
}
type TState = {
  inputType: THidden | TShow
  isRequest: boolean
}

const inputShowTextProps: THidden = {
  type: 'text',
  icon: 'HideIcon'
}
const inputHiddenTextProps: TShow = {
  type: 'password',
  icon: 'ShowIcon'
}

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()

  const { values, handleChange } = useForm({
    token: '',
    password: ''
  })

  const [state, setState] = useState<TState>({
    inputType: inputHiddenTextProps,
    isRequest: false
  })

  const toggleInputType = () =>
    setState({
      ...state,
      inputType:
        state.inputType.type === 'password'
          ? inputShowTextProps
          : inputHiddenTextProps
    })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState({ ...state, isRequest: true })
    passwordChangeAPI(values)
      .then(() =>
        navigate('/login', {
          state: location.state
        })
      )
      .catch(err => setState({ ...state, isRequest: false }))
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
          type={state.inputType.type}
          placeholder="Введите новый пароль"
          onChange={handleChange}
          value={values.password}
          name={'password'}
          icon={state.inputType.icon}
          onIconClick={toggleInputType}
          disabled={state.isRequest}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={handleChange}
          value={values.token}
          name={'token'}
          disabled={state.isRequest}
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          disabled={state.isRequest}
        >
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
