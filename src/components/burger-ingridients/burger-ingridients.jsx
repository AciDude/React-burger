import React from "react"
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngridientsSection from "../ingridients-section/ingridients-section"
import style from './burger-ingridients.module.css'
import PropTypes from 'prop-types';

const ingridientPropTypes = PropTypes.shape({
   _id: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   proteins: PropTypes.number.isRequired,
   price: PropTypes.number.isRequired,
   name: PropTypes.string.isRequired,
   image_mobile: PropTypes.string.isRequired,
   image_large: PropTypes.string.isRequired,
   image: PropTypes.string.isRequired,
   fat: PropTypes.number.isRequired,
   carbohydrates: PropTypes.number.isRequired,
   calories: PropTypes.number.isRequired,
   __v: PropTypes.number.isRequired,
})

export default function BurgerIngridients({ ingridients }) {
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
            <IngridientsSection title='Булки' ingridients={buns} />
            <IngridientsSection title='Соусы' ingridients={sauces} />
            <IngridientsSection title='Начинки' ingridients={mains} />
         </div>
      </section>
   )
}

BurgerIngridients.propTypes = {
   ingridients: PropTypes.arrayOf(ingridientPropTypes).isRequired
}