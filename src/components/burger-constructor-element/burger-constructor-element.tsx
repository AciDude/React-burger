import React, { useRef } from 'react'
import style from './burger-constructor-element.module.css'
import { useDrag, useDrop } from 'react-dnd'
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredientMain, TIngredientSauce } from '../../utils/types'

type TProps = {
  ingredient: Readonly<TIngredientMain | TIngredientSauce>
  index: number
  onClickIngredient(id: string): void
  moveCard(dragIndex: number, hoverIndex: number): void
}

export default function BurgerConstructorElement({
  ingredient,
  onClickIngredient,
  moveCard,
  index
}: TProps) {
  const id = ingredient.dragId
  const ref = useRef<HTMLLIElement>(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = (item as { id: string; index: number }).index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY =
        clientOffset && clientOffset.y - hoverBoundingRect.top
      if (
        hoverClientY &&
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY
      ) {
        return
      }
      if (
        hoverClientY &&
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY
      ) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      ;(item as { id: string; index: number }).index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id, index }),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <li
      data-handler-id={handlerId}
      ref={ref}
      className={`${style.ingredient} pl-4`}
      key={ingredient.dragId}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={`${ingredient.name}`}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => onClickIngredient(ingredient.dragId)}
      />
    </li>
  )
}
