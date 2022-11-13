import React, { useRef } from 'react'
import style from './burger-constructor-element.module.css'
import { useDrag, useDrop } from 'react-dnd'
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

export default function BurgerConstructorElement({
  ingredient,
  onClickIngredient,
  moveCard,
  index
}) {
  const id = ingredient.dragId
  const ref = useRef(null)
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
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
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

  const preventDefault = e => e.preventDefault()
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
        onDrop={preventDefault}
      />
    </li>
  )
}

BurgerConstructorElement.propTypes = {
  ingredient: PropTypes.object.isRequired,
  onClickIngredient: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}
