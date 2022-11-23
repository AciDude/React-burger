import React from 'react'
import image from '../../image/404-error.png'
import style from './not-found-404.module.css'
import LoadedImage from '../../components/UI/loaded-image/loaded-image'
import ClipLoader from 'react-spinners/ClipLoader'

export default function NotFound404() {
  return (
    <div className={`${style.container}`}>
      <div className={`${style.image_container}`}>
        <LoadedImage
          src={image}
          alt="Ошибка 404"
          preloader={<ClipLoader color="#f04ab9" size="100px" />}
          className={`${style.image}`}
        />
      </div>
      <p className={`${style.text} text_type_main-large`}>
        Страница не найдена
      </p>
    </div>
  )
}
