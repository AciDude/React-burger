import React, { useContext, useMemo } from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } 
   from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import OrderDetails from "../order-details/order-details"
import { IngredientsContext } from "../../services/app-context"
import { request } from "../../utils/request.js"

const URL_ORDERS = 'https://norma.nomoreparties.space/api/orders'

const BurgerConstructor = function ({ openModal }) {
   const { ingredients } = useContext(IngredientsContext)

   const randomIngredients = useMemo(() => {
      const buns = ingredients.filter(ingredient => ingredient.type === 'bun')
      const bun = buns[Math.floor(Math.random() * buns.length)]
      const otherRandomIngredients = ingredients.filter(ingredient => {
         return ingredient.type !== 'bun' && Math.round(Math.random() * 0.65)
      })
      const bunPrice = bun?.price ?? 0
      const total = bunPrice * 2 + otherRandomIngredients.reduce(
         (sum, ingredient) => ingredient.price + sum,
         0
      )
      return {bun, otherRandomIngredients, total}
   }, [ingredients])
   
   const {bun, otherRandomIngredients, total} = randomIngredients

   const onClick = async () => {
      try {
         const ingredientsId = [
            ...otherRandomIngredients.map(element => element._id), 
            bun._id, bun._id
         ]
         const requestBody = { ingredients: ingredientsId }
         const result = await request(URL_ORDERS, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestBody)
         })
         openModal(<OrderDetails order={result.order.number} />)
      } catch (err) {
         console.error(err)
      }
   }

   return (
      <section className={style.section}>
         <div className={`${style.burger} pt-25 mb-10`}>
            <div className="mb-4 pl-4 pr-4">
               <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun?.name ?? ''} (верх)`}
                  price={bun?.price ?? ''}
                  thumbnail={bun?.image_mobile ?? ''}
               />
            </div>
            <ul className={style.ingredients}>
               {otherRandomIngredients.map(ingredient => (
                  <li
                     className={`${style.ingredient} pl-4`}
                     key={ingredient._id}
                  >
                     <DragIcon type="primary" />
                     <ConstructorElement
                        text={`${ingredient.name}`}
                        price={ingredient.price}
                        thumbnail={ingredient.image_mobile}
                     />
                  </li>
               ))}
            </ul>
            <div className="mt-4 pl-4 pr-4">
               <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun?.name ?? ''} (низ)`}
                  price={bun?.price ?? ''}
                  thumbnail={bun?.image_mobile ?? ''}
               />
            </div>
         </div>
         <div className={`${style.order} mr-4`}>
            <div className="text_type_digits-medium mr-10">
               {total} <CurrencyIcon type="primary" />
            </div>
            <Button
               type="primary"
               size="medium"
               htmlType='button'
               onClick={onClick}
            >
               Оформить заказ
            </Button>
         </div>
      </section>
   )
}

BurgerConstructor.propTypes = {
   openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor