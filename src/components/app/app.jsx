import React, {useState, useEffect} from 'react'
import AppHeader from '../app-header/app-header'
import style from './app.module.css'
import BurgerIngridients from '../burger-ingridients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

const URL_INGRIDIENTS = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [ingridients, setIngridients] = useState([])

  useEffect(() => {
    fetch(URL_INGRIDIENTS)
      .then(data => data.json())
      .then(result => setIngridients(result.data))
      .catch(err => console.error(err))
  }, [])
  
  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngridients ingridients={ingridients} />
        <BurgerConstructor ingridients={ingridients} />
      </main>
    </>
  );
}

export default App;
