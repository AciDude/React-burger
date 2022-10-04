import React from 'react';
import AppHeader from '../app-header/app-header';
import style from './app.module.css';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import data from '../../utils/data.js'

import IngridientDetails from '../ingridient-details/ingridient-details.jsx';

function App() {
  const ingridients = data()
  console.log(ingridients)
  return (
    <div>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngridients ingridients={ingridients} />
        <BurgerConstructor ingridients={ingridients} />
      </main>
      <IngridientDetails {...ingridients[0]} />
    </div>
  );
}

export default App;
