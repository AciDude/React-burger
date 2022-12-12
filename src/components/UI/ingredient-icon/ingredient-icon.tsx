import React, { CSSProperties } from 'react'
import style from './ingredient-icon.module.css'
import LoadedImage from '../loaded-image/loaded-image'

type TProps = {
  readonly src: string
  readonly alt: string
  readonly className?: string
  readonly extraStyle?: CSSProperties | undefined
  readonly count?: number
}

export default function IngredientIcon({
  src,
  alt,
  className = '',
  extraStyle = undefined,
  count = 0
}: TProps) {
  const classes = [style.wrapper]
  className && classes.push(className)
  return (
    <div style={extraStyle} className={classes.join(' ')}>
      <div className={style.container}>
        {Boolean(count) && (
          <p
            className={`${style.count} text text_type_main-default`}
          >{`+${count}`}</p>
        )}
        <LoadedImage src={src} alt={alt} className={style.image} />
      </div>
    </div>
  )
}
