import React, { useCallback } from 'react'
import {
  DELETE_INGREDIENT,
  UPDATE_CONSTRUCTOR_LIST
} from '../../services/actions/burger-constructor'
import { useDispatch } from 'react-redux'
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element'
import style from './burger-constructor-list.module.css'
import PropTypes from 'prop-types'

export default function BurgerConstructorList({ fillings }) {
  const dispatch = useDispatch()
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = fillings[dragIndex]
      const newCards = [...fillings]
      newCards.splice(dragIndex, 1)
      newCards.splice(hoverIndex, 0, dragCard)

      dispatch({
        type: UPDATE_CONSTRUCTOR_LIST,
        fillings: newCards
      })
    },
    [fillings, dispatch]
  )
  const onClickIngredient = useCallback(
    id => {
      dispatch({ type: DELETE_INGREDIENT, id })
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

BurgerConstructorList.propTypes = {
  fillings: PropTypes.array.isRequired
}
