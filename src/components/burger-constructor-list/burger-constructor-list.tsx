import React, { useCallback } from 'react'
import {
  deleteIngredient,
  updateConstructorList
} from '../../services/actions/burger-constructor'
import { useDispatch } from '../../hooks'
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element'
import style from './burger-constructor-list.module.css'
import { TIngredientMain, TIngredientSauce } from '../../utils/data-types'

type TProps = {
  fillings: ReadonlyArray<TIngredientMain | TIngredientSauce | never>
}

export default function BurgerConstructorList({ fillings }: TProps) {
  const dispatch = useDispatch()
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number): void => {
      const dragCard = fillings[dragIndex]
      const newCards = [...fillings]
      newCards.splice(dragIndex, 1)
      newCards.splice(hoverIndex, 0, dragCard)

      dispatch(updateConstructorList(newCards))
    },
    [fillings, dispatch]
  )
  const onClickIngredient = useCallback(
    (id: string): void => {
      dispatch(deleteIngredient(id))
    },
    [dispatch]
  )

  return (
    <ul className={style.ingredients}>
      {fillings.map((ingredient, index) => (
        <BurgerConstructorElement
          ingredient={ingredient}
          onClickIngredient={onClickIngredient}
          key={ingredient.dragId}
          moveCard={moveCard}
          index={index}
        />
      ))}
    </ul>
  )
}
