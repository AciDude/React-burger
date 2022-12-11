import React, { useState, useEffect, useRef } from 'react'
import style from './person.module.css'
import {
  Input,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from '../../hooks'
import { patchUser } from '../../services/actions/auth'
import { selectUser } from '../../services/selectors'

type TInputs = 'name' | 'email' | 'password'

export default function Person() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const [inputsState, setInputsState] = useState({
    name: { value: '', isFocused: false, isChanged: false },
    email: { value: '', isFocused: false, isChanged: false },
    password: { value: '', isFocused: false, isChanged: false }
  })

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user)
      setInputsState({
        name: { value: user.name, isChanged: false, isFocused: false },
        email: { value: user.email, isChanged: false, isFocused: false },
        password: { value: '', isChanged: false, isFocused: false }
      })
  }, [user])

  const onIconClick = (element: HTMLInputElement | null) => {
    if (element) {
      setInputsState({
        ...inputsState,
        [element.name]: {
          ...inputsState[element.name as TInputs],
          isFocused: true
        }
      })
      setTimeout(() => element.focus(), 0)
    }
  }

  const isChange = Object.values(inputsState).some(item => item.isChanged)

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    setInputsState({
      ...inputsState,
      [e.target.name]: {
        ...inputsState[e.target.name as TInputs],
        isFocused: false
      }
    })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setInputsState({
        ...inputsState,
        [e.target.name]: {
          ...inputsState[e.target.name as TInputs],
          value: e.target.value,
          isChanged:
            e.target.name === 'password'
              ? e.target.value !== ''
              : e.target.value !== user[e.target.name as 'name' | 'email']
        }
      })
    }
  }

  const onClickCancel = () => {
    if (user) {
      setInputsState({
        ...inputsState,
        name: { ...inputsState.name, value: user.name, isChanged: false },
        email: { ...inputsState.email, value: user.email, isChanged: false },
        password: { ...inputsState.password, value: '', isChanged: false }
      })
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = Object.entries(inputsState).reduce(
      (acc: { [name: string]: string }, item) => {
        if (item[1].isChanged) {
          const key = item[0]
          const value = item[1].value
          acc[key] = value
        }
        return acc
      },
      {}
    )
    dispatch(patchUser(body))
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
