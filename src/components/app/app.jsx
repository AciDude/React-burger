import React, { useState, useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import style from './app.module.css'
import BurgerIngridients from '../burger-ingridients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../UI/modal/modal'
import useModalControl from '../../hooks/use-modal-control.js'
import { request } from '../../utils/request'
import { IngridientsContext } from '../../utils/app-context'

const URL_INGRIDIENTS = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [ingridients, setIngridients] = useState([])
  const [modalDetails, openModal, closeModal] = useModalControl()

  useEffect(() => {
    request(URL_INGRIDIENTS)
      .then(result => setIngridients(result.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <IngridientsContext.Provider value={{ ingridients, setIngridients }}>
          <BurgerIngridients
            ingridients={ingridients}
            openModal={openModal}
          />
          <BurgerConstructor
            openModal={openModal}
          />
        </IngridientsContext.Provider>
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
