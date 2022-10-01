import React from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css'
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

export default function BurgerConstructor({ ingridients }) {
   const buns = ingridients.filter(ingridient => ingridient.type === 'bun')
   const randomBun = buns[Math.floor(Math.random() * buns.length)]
   const otherRandomIngridients = ingridients.filter(el => Math.round(Math.random() * 0.65))
   const total = randomBun.price + otherRandomIngridients.reduce(
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
                  text={`${randomBun.name} (верх)`}
                  price={randomBun.price}
                  thumbnail={randomBun.image_mobile}
               />
            </div>
            <div className={style.ingridients}>
               {otherRandomIngridients.map((ingridient, index, array) => (
                  <div
                     className={index != array.length - 1 ? `${style.ingridient} mb-4 pl-4` : `${style.ingridient} pl-4`}
                     key={ingridient._id}
                  >
                     <DragIcon type="primary" />
                     <ConstructorElement
                        text={`${ingridient.name}`}
                        price={ingridient.price}
                        thumbnail={ingridient.image_mobile}
                     />
                  </div>
               ))}
            </div>
            <div className="mt-4 pl-4 pr-4">
               <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${randomBun.name} (низ)`}
                  price={randomBun.price}
                  thumbnail={randomBun.image_mobile}
               />
            </div>
         </div>
         <div className={`${style.order} mr-4`}>
            <div className="text_type_digits-medium mr-10">
               {total} <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="medium" htmlType='button'>
               Оформить заказ
            </Button>
         </div>
      </section>
   )
}

BurgerConstructor.propTypes = {
   ingridients: PropTypes.arrayOf(ingridientPropTypes).isRequired
}