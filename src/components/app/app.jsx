import React, { useState, useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import style from './app.module.css'
import BurgerIngridients from '../burger-ingridients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../UI/modal/modal'
import useModalControl from '../../hooks/use-modal-control.js'

const URL_INGRIDIENTS = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [ingridients, setIngridients] = useState([])
  const [modalDetails, openModal, closeModal] = useModalControl()

  useEffect(() => {
    fetch(URL_INGRIDIENTS)
      .then(data => data.json())
      .then(result => {
        if (!result.success) throw new Error('Ошибка загрузки данных')
        setIngridients(result.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngridients
          ingridients={ingridients}
          openModal={openModal}
        />
        <BurgerConstructor
          ingridients={ingridients}
          openModal={openModal}
        />
      </main>
      <Modal
        closeModal={closeModal}
        isModalShowed={modalDetails.isOpen}
        title={modalDetails.title}
      >{modalDetails.children}</Modal>
    </>
  );
}

export default App;
