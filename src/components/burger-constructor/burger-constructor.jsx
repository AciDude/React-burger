import React from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import { ingridientPropTypes } from '../../utils/prop-types.js'
import OrderDetails from "../order-details/order-details"

const BurgerConstructor = React.memo(function ({ ingridients, openModal }) {

   const onClick = () => openModal(<OrderDetails />)

   const buns = ingridients.filter(ingridient => ingridient.type === 'bun')
   const randomBun = buns[Math.floor(Math.random() * buns.length)]
   const otherRandomIngridients = ingridients.filter(ingridient => {
      return ingridient.type !== 'bun' && Math.round(Math.random() * 0.65)
   })
   const total = randomBun?.price + otherRandomIngridients.reduce(
      (sum, ingridient) => ingridient.price + sum,
      0
   )

   return (
      <section className={style.section}>
         <div className={`${style.burger} pt-25 mb-10`}>
            <div className="mb-4 pl-4 pr-4">
               <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${randomBun?.name} (верх)`}
                  price={randomBun?.price}
                  thumbnail={randomBun?.image_mobile}
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
                  text={`${randomBun?.name} (низ)`}
                  price={randomBun?.price}
                  thumbnail={randomBun?.image_mobile}
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
   ingridients: PropTypes.arrayOf(ingridientPropTypes()).isRequired,
   openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor