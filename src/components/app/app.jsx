import React, { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import style from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../UI/modal/modal'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/burger-ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients '

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients(URL_INGREDIENTS))
  }, [])

  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      <Modal />
    </>
  )
}

export default App
