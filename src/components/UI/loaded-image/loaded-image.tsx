import React, { useState, CSSProperties } from 'react'
import style from './loaded-image.module.css'

type TProps = {
  readonly src: string
  readonly alt: string
  readonly preloader?: JSX.Element | null
  readonly className?: string
  readonly extraStyle?: CSSProperties | undefined
}

export default function LoadedImage({
  src,
  alt,
  preloader = null,
  className = '',
  extraStyle = undefined
}: TProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const onLoad = () => setIsLoaded(true)
  const classes = [style.image, className]
  isLoaded && classes.push(style.show)

  return (
    <>
      <img
        src={src}
        alt={alt}
        onLoad={onLoad}
        className={classes.join(' ')}
        style={extraStyle}
      />
      {preloader && !isLoaded && (
        <div className={style.preloader}>{preloader}</div>
      )}
    </>
  )
}
