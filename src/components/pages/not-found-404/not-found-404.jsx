import React from 'react'
import image from '../../../image/404-error.png'
import style from './not-found-404.module.css'

export default function NotFound404() {
  return (
    <div className={`${style.container}`}>
      <img src={image} alt="Ошибка 404" className={`${style.image}`} />
      <p className={`${style.text} text_type_main-large`}>
        Страница не найдена
      </p>
    </div>
  )
}
