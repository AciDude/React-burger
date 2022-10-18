import React from "react"
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsSection from "../ingredients-section/ingredients-section"
import style from './burger-ingredients.module.css'
import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/prop-types.js'

const BurgerIngredients = React.memo(function ({ ingredients, openModal }) {
   const buns = ingredients.filter(ingredient => ingredient.type === 'bun')
   const mains = ingredients.filter(ingredient => ingredient.type === 'main')
   const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce')

   return (
      <section className={`${style.section} mt-10 mb-10`}>
         <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
         <div className={style.tab}>
            <Tab active>Булки</Tab>
            <Tab >Соусы</Tab>
            <Tab >Начинки</Tab>
         </div>
         <div className={style.ingredients}>
            <IngredientsSection title='Булки' ingredients={buns} openModal={openModal} />
            <IngredientsSection title='Соусы' ingredients={sauces} openModal={openModal} />
            <IngredientsSection title='Начинки' ingredients={mains} openModal={openModal} />
         </div>
      </section>
   )
})

BurgerIngredients.propTypes = {
   ingredients: PropTypes.arrayOf(ingredientPropTypes()).isRequired,
   openModal: PropTypes.func.isRequired,
}

export default BurgerIngredients