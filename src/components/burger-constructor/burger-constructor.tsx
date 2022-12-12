import React, { useMemo } from 'react'
import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css'
import { useSelector, useDispatch } from '../../hooks'
import { getOrder } from '../../services/actions/order-details'
import { useDrop } from 'react-dnd'
import { v4 as uuid } from 'uuid'
import { addIngredient } from '../../services/actions/burger-constructor'
import BurgerConstructorList from '../burger-constructor-list/burger-constructor-list'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import MoonLoader from 'react-spinners/MoonLoader'
import {
  TIngredientBun,
  TIngredientMain,
  TIngredientSauce
} from '../../utils/data-types'
import {
  selectConstructorBun,
  selectConstructorFillings,
  selectUser,
  selectLogoutRequest,
  selectOrderRequest
} from '../../services/selectors'

const BurgerConstructor = function () {
  const fillings = useSelector(selectConstructorFillings)
  const bun = useSelector(selectConstructorBun)
  const user = useSelector(selectUser)
  const logoutRequest = useSelector(selectLogoutRequest)
  const orderRequest = useSelector(selectOrderRequest)

  const dispatch = useDispatch()

  const location = useLocation()
  const navigate = useNavigate()

  const total = useMemo(() => {
    const bunPrice = bun?.price ?? 0
    return (
      bunPrice * 2 +
      fillings.reduce<number>(
        (
          sum: number,
          ingredient: Readonly<TIngredientMain | TIngredientSauce>
        ): number => ingredient.price + sum,
        0
      )
    )
  }, [bun, fillings])

  const onClickOrder = () => {
    if (bun) {
      dispatch(getOrder(bun, fillings))
      navigate('/modal-order', {
        state: { background: location }
      })
    }
  }

  const [, dropTargetRef] = useDrop<
    Readonly<TIngredientBun | TIngredientMain | TIngredientSauce>,
    unknown,
    { isHover: boolean }
  >({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      dispatch(
        addIngredient(
          ingredient.type === 'bun'
            ? ingredient
            : { ...ingredient, dragId: uuid() }
        )
      )
    }
  })

  const title = (
    <p className="text text_type_main-medium m-10">
      Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
    </p>
  )

  return (
    <section ref={dropTargetRef} className={style.section}>
      {!bun && !fillings.length ? (
        title
      ) : (
        <>
          <div className={`${style.burger} pt-25 mb-10`}>
            <MoonLoader
              color="#a832a4"
              className={orderRequest ? style.preloader : style.hidden}
              size={80}
            />
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
          {user ? (
            <div className={`${style.order} mr-4`}>
              <div className="text_type_digits-medium mr-10">
                {total} <CurrencyIcon type="primary" />
              </div>
              <Button
                type="primary"
                size="medium"
                htmlType="button"
                onClick={onClickOrder}
                disabled={!bun || orderRequest || logoutRequest}
              >
                Оформить заказ
              </Button>
            </div>
          ) : (
            <div className="text text_type_main-default">
              <Link
                to="/login"
                state={{ pathname: location.pathname }}
                className="text_type_main-medium text_color_inactive"
              >
                Авторизуйтесь
              </Link>{' '}
              <span>для оформления заказа</span>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default BurgerConstructor
