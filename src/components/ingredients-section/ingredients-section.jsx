import React from 'react'
import IngredientCard from '../ingredient-card/ingredient-card'
import style from './ingredients-section.module.css'
import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/prop-types.js'
import { useSelector } from 'react-redux'

const IngredientsSection = React.forwardRef(
  ({ title, ingredients, count = {}, type }, ref) => {
    return (
      <div ref={ref} data-type={type} className="mb-10 mt-10 ml-4 mr-4">
        <h2 className="text text_type_main-medium mb-6">{title}</h2>
        <div className={style.ingredients}>
          {ingredients.map(ingredient => (
            <IngredientCard
              key={ingredient._id}
              ingredient={ingredient}
              count={count[ingredient._id] ? count[ingredient._id] : 0}
            />
          ))}
        </div>
      </div>
    )
  }
)
export default IngredientsSection

IngredientsSection.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes()).isRequired
}
