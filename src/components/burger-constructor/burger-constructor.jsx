import React, { useContext } from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import OrderDetails from "../order-details/order-details"
import { IngridientsContext } from "../../utils/app-context"
import { request } from "../../utils/request.js"

const URL_ORDERS = 'https://norma.nomoreparties.space/api/orders'

const BurgerConstructor = React.memo(function ({ openModal }) {
   const { ingridients } = useContext(IngridientsContext)

   const buns = ingridients.filter(ingridient => ingridient.type === 'bun')
   const bun = buns[Math.floor(Math.random() * buns.length)]
   const otherRandomIngridients = ingridients.filter(ingridient => {
      return ingridient.type !== 'bun' && Math.round(Math.random() * 0.65)
   })
   const bunPrice = bun?.price ?? 0
   const total = bunPrice * 2 + otherRandomIngridients.reduce(
      (sum, ingridient) => ingridient.price + sum,
      0
   )

   const onClick = async () => {
      try {
         const ingridientsID = [...otherRandomIngridients.map(element => element._id), bun._id, bun._id]
         const requestBody = { ingredients: ingridientsID }
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
            <ul className={style.ingridients}>
               {otherRandomIngridients.map((ingridient, index, array) => (
                  <li
                     className={index != array.length - 1 ? `${style.ingridient} mb-4 pl-4` : `${style.ingridient} pl-4`}
                     key={ingridient._id}
                  >
                     <DragIcon type="primary" />
                     <ConstructorElement
                        text={`${ingridient.name}`}
                        price={ingridient.price}
                        thumbnail={ingridient.image_mobile}
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
})

BurgerConstructor.propTypes = {
   openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor