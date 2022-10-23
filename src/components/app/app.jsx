import React, { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import style from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../UI/modal/modal'
import { useSelector, useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/burger-ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderDetails from '../order-details/order-details'
import {
  CLEAR_MODAL_TYPE,
  CLOSE_MODAL,
  SET_MODAL_TYPE,
  OPEN_MODAL
} from '../../services/actions/actions'
import { CLEAR_CURRENT_INGREDIENT } from '../../services/actions/ingredient-details'
import { CLEAR_ORDER } from '../../services/actions/order-details'

function App() {
  const { contentType } = useSelector(state => state.switchModal)
  const order = useSelector(state => state.orderDetails.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  useEffect(() => {
    if (order) {
      dispatch({ type: SET_MODAL_TYPE, payload: 'order' })
      dispatch({ type: OPEN_MODAL })
    }
  }, [order])

  let contentModal
  let title
  switch (contentType) {
    case 'ingredient':
      contentModal = <IngredientDetails />
      title = 'Детали ингредиента'
      break
    case 'order':
      contentModal = <OrderDetails />
      break
  }

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL })
    dispatch({ type: CLEAR_MODAL_TYPE })
    contentType === 'ingredient' && dispatch({ type: CLEAR_CURRENT_INGREDIENT })
    contentType === 'order' && dispatch({ type: CLEAR_ORDER })
  }

  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      <Modal closeModal={closeModal} title={title}>
        {contentModal}
      </Modal>
    </>
  )
}

export default App
