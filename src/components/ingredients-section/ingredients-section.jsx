import React from 'react'
import IngredientCard from '../ingredient-card/ingredient-card'
import style from './ingredients-section.module.css'
import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/prop-types.js'

export default function IngredientsSection({ title, ingredients, openModal }) {

   return (
      <div className="mb-10 mt-10 ml-4 mr-4">
         <h2 className="text text_type_main-medium mb-6">{title}</h2>
         <div className={style.ingredients}>
            {ingredients.map(ingredient => (
               <IngredientCard key={ingredient._id} ingredient={ingredient} openModal={openModal} />
            )
            )}
         </div>
      </div>
   )
}

IngredientsSection.propTypes = {
   title: PropTypes.string.isRequired,
   ingredients: PropTypes.arrayOf(ingredientPropTypes()).isRequired,
   openModal: PropTypes.func.isRequired,
}