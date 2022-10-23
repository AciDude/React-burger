import React, { useMemo } from 'react'
import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getOrder } from '../../services/actions/order-details'
import { useDrop } from 'react-dnd'
import { v4 as uuid } from 'uuid'
import { ADD_INGREDIENT } from '../../services/actions/burger-constructor'
import BurgerConstructorList from '../burger-constructor-list/burger-constructor-list'

const BurgerConstructor = function () {
  const { bun, fillings } = useSelector(state => state.burgerConstructor)

  const dispatch = useDispatch()

  const total = useMemo(() => {
    const bunPrice = bun?.price ?? 0
    return (
      bunPrice * 2 +
      fillings.reduce((sum, ingredient) => ingredient.price + sum, 0)
    )
  }, [bun, fillings])

  const onClickOrder = () => {
    dispatch(getOrder(bun, fillings))
  }

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      const action =
        ingredient.type === 'bun'
          ? {
              type: ADD_INGREDIENT,
              ingredient
            }
          : {
              type: ADD_INGREDIENT,
              ingredient: {
                ...ingredient,
                dragId: uuid()
              }
            }
      dispatch(action)
    }
  })

  const title = (
    <p className="text text_type_main-medium m-10">
      Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
    </p>
  )

  const propButton = {
    type: 'primary',
    size: 'medium',
    htmlType: 'button',
    onClick: onClickOrder
  }
  propButton.disabled = !bun

  return (
    <section ref={dropTargetRef} className={style.section}>
      {!bun && !fillings.length ? (
        title
      ) : (
        <>
          <div className={`${style.burger} pt-25 mb-10`}>
            <div className="mb-4 pl-4 pr-4">
              {bun && (
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun?.name ?? ''} (верх)`}
                  price={bun?.price ?? ''}
                  thumbnail={bun?.image_mobile ?? ''}
                />
              )}
            </div>
            <BurgerConstructorList fillings={fillings} />
            <div className="mt-4 pl-4 pr-4">
              {bun && (
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun?.name ?? ''} (низ)`}
                  price={bun?.price ?? ''}
                  thumbnail={bun?.image_mobile ?? ''}
                />
              )}
            </div>
          </div>
          <div className={`${style.order} mr-4`}>
            <div className="text_type_digits-medium mr-10">
              {total} <CurrencyIcon type="primary" />
            </div>
            <Button {...propButton}>Оформить заказ</Button>
          </div>
        </>
      )}
    </section>
  )
}

export default BurgerConstructor
