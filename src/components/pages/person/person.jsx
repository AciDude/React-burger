import React, { useState, useEffect, useRef } from 'react'
import style from './person.module.css'
import {
  Input,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../../services/actions/auth'

export default function Person() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const [inputsState, setInputsState] = useState({
    name: { value: '', isFocused: false, isChanged: false },
    email: { value: '', isFocused: false, isChanged: false },
    password: { value: '', isFocused: false, isChanged: false }
  })

  const nameRef = useRef()
  const emailRef = useRef()

  useEffect(() => {
    if (user)
      setInputsState({
        ...inputsState,
        name: { ...inputsState.name, value: user.name, isChanged: false },
        email: { ...inputsState.email, value: user.email, isChanged: false },
        password: { ...inputsState.password, value: '', isChanged: false }
      })
  }, [user])

  const onIconClick = element => {
    setInputsState({
      ...inputsState,
      [element.name]: { ...inputsState[element.name], isFocused: true }
    })
    setTimeout(() => element.focus(), 0)
  }

  const isChange = Object.values(inputsState).some(item => item.isChanged)

  const onBlur = e =>
    setInputsState({
      ...inputsState,
      [e.target.name]: { ...inputsState[e.target.name], isFocused: false }
    })

  const onChange = e => {
    setInputsState({
      ...inputsState,
      [e.target.name]: {
        ...inputsState[e.target.name],
        value: e.target.value,
        isChanged:
          e.target.name === 'password'
            ? e.target.value !== ''
            : e.target.value !== user[e.target.name]
      }
    })
  }

  const onClickCancel = () =>
    setInputsState({
      ...inputsState,
      name: { ...inputsState.name, value: user.name, isChanged: false },
      email: { ...inputsState.email, value: user.email, isChanged: false },
      password: { ...inputsState.password, value: '', isChanged: false }
    })

  const onSubmit = e => {
    e.preventDefault()
    const body = Object.entries(inputsState).reduce((acc, item) => {
      if (item[1].isChanged) {
        const key = item[0]
        const value = item[1].value
        acc[key] = value
      }
      return acc
    }, {})
    dispatch(getUser(body, 'PATCH'))
  }

  return (
    <form className={style.container} onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder={`Имя`}
        onChange={onChange}
        value={inputsState.name.value}
        name={'name'}
        onIconClick={() => onIconClick(nameRef.current)}
        autoComplete="off"
        icon="EditIcon"
        className={`text input__textfield text_type_main-default ${
          !inputsState.name.isFocused ? 'text_color_inactive' : ''
        }`}
        ref={nameRef}
        disabled={!inputsState.name.isFocused}
        style={{ cursor: !inputsState.name.isFocused ? 'not-allowed' : 'auto' }}
        onBlur={onBlur}
      />
      <Input
        type="text"
        placeholder={`Логин`}
        onChange={onChange}
        value={inputsState.email.value}
        name={'email'}
        onIconClick={() => onIconClick(emailRef.current)}
        autoComplete="off"
        icon="EditIcon"
        className={`text input__textfield text_type_main-default ${
          !inputsState.email.isFocused ? 'text_color_inactive' : ''
        }`}
        ref={emailRef}
        disabled={!inputsState.email.isFocused}
        style={{
          cursor: !inputsState.email.isFocused ? 'not-allowed' : 'auto'
        }}
        onBlur={onBlur}
      />
      <PasswordInput
        onChange={onChange}
        value={inputsState.password.value}
        name={'password'}
        icon="EditIcon"
      />
      {isChange && (
        <div className={style.buttons}>
          <Button
            type="secondary"
            size="medium"
            htmlType="button"
            onClick={onClickCancel}
          >
            Отмена
          </Button>
          <Button type="primary" size="medium" htmlType="submit">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  )
}
