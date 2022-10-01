import React from 'react';
import AppHeader from './components/app-header/app-header';
import style from './App.module.css';
import BurgerIngridients from './components/burger-ingridients/burger-ingridients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import data from './utils/data.js'

function App() {
  const ingridients = data()
  return (
    <div>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngridients ingridients={ingridients} />
        <BurgerConstructor ingridients={ingridients} />
      </main>
    </div>
  );
}

export default App;
