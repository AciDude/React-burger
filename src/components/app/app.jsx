import React, { useState, useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import style from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../UI/modal/modal'
import useModalControl from '../../hooks/use-modal-control.js'
import { request } from '../../utils/request'
import { IngredientsContext } from '../../services/app-context'

const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [ingredients, setIngredients] = useState([])
  const [modalDetails, openModal, closeModal] = useModalControl()

  useEffect(() => {
    request(URL_INGREDIENTS)
      .then(result => setIngredients(result.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <AppHeader />
      <main className={style.main}>
          <BurgerIngredients
            ingredients={ingredients}
            openModal={openModal}
          />
          <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
            <BurgerConstructor
              openModal={openModal}
            />
        </IngredientsContext.Provider>
      </main>
      <Modal
        closeModal={closeModal}
        isOpen={modalDetails.isOpen}
        title={modalDetails.title}
      >{modalDetails.children}</Modal>
    </>
  );
}

export default App;
