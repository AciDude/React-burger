import React from "react"
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngridientsSection from "../ingridients-section/ingridients-section"
import style from './burger-ingridients.module.css'
import PropTypes from 'prop-types'
import { ingridientPropTypes } from '../../utils/prop-types.js'

const BurgerIngridients = React.memo(function ({ ingridients, openModal }) {
   const buns = ingridients.filter(ingridient => ingridient.type === 'bun')
   const mains = ingridients.filter(ingridient => ingridient.type === 'main')
   const sauces = ingridients.filter(ingridient => ingridient.type === 'sauce')

   return (
      <section className={`${style.section} mt-10 mb-10`}>
         <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
         <div className={style.tab}>
            <Tab active>Булки</Tab>
            <Tab >Соусы</Tab>
            <Tab >Начинки</Tab>
         </div>
         <div className={style.ingridients}>
            <IngridientsSection title='Булки' ingridients={buns} openModal={openModal} />
            <IngridientsSection title='Соусы' ingridients={sauces} openModal={openModal} />
            <IngridientsSection title='Начинки' ingridients={mains} openModal={openModal} />
         </div>
      </section>
   )
})

BurgerIngridients.propTypes = {
   ingridients: PropTypes.arrayOf(ingridientPropTypes()).isRequired,
   openModal: PropTypes.func.isRequired,
}

export default BurgerIngridients