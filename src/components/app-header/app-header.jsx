import React from 'react'
import style from './app-header.module.css'
import { Logo, ProfileIcon, BurgerIcon, ListIcon } 
   from '@ya.praktikum/react-developer-burger-ui-components'
import ButtonHeader from '../UI/button-header/button-header.jsx'

const AppHeader = React.memo(function () {

   return (
      <header className={`${style.header} pt-4 pb-4`}>
         <div className={style.container}>
            <nav>
               <ul className={style.list}>
                  <li className='ml-2'>
                     <ButtonHeader isCurrent={true}>
                        <BurgerIcon type="primary" />
                        <span className='ml-2'>Конструктор</span>
                     </ButtonHeader>
                  </li>
                  <li>
                     <ButtonHeader>
                        <ListIcon type="secondary" />
                        <span className='ml-2'>Лента заказов</span>
                     </ButtonHeader>
                  </li>
               </ul>
            </nav>
            <div><Logo /></div>
            <div className={style.profile}>
               <ButtonHeader>
                  <ProfileIcon type="secondary" />
                  <span className='ml-2'>Личный кабинет</span>
               </ButtonHeader>
            </div>
         </div>
      </header>
   )
})

export default AppHeader