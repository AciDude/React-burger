import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsSection from '../ingredients-section/ingredients-section'
import style from './burger-ingredients.module.css'
import { useSelector } from 'react-redux'

const BurgerIngredients = function () {
  const getIngredientsOfType = (state, type) =>
    state.burgerIngredients.ingredients.filter(
      ingredient => ingredient.type === type
    )
  const buns = useSelector(state => getIngredientsOfType(state, 'bun'))
  const mains = useSelector(state => getIngredientsOfType(state, 'main'))
  const sauces = useSelector(state => getIngredientsOfType(state, 'sauce'))
  const { bun, fillings } = useSelector(state => state.burgerConstructor)
  const refObserver = useRef()
  const refBuns = useRef()
  const refMain = useRef()
  const refSauces = useRef()
  const [tabs, setTabs] = useState([
    { type: 'buns', isActive: true, text: 'Булки' },
    { type: 'sauces', isActive: false, text: 'Соусы' },
    { type: 'mains', isActive: false, text: 'Начинки' }
  ])

  const count = useMemo(() => {
    const obj = { [bun?._id]: 1 }
    fillings.forEach(filling =>
      obj[filling._id] ? obj[filling._id]++ : (obj[filling._id] = 1)
    )
    return obj
  }, [bun, fillings])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          entry.intersectionRatio >= 0.5 &&
            setTabs(
              tabs.map(tab => {
                return {
                  ...tab,
                  isActive: tab.type === entry.target.dataset.type
                }
              })
            )
        })
      },
      {
        root: refObserver.current,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.5
      }
    )
    const setObserve = (observer, ...array) => {
      array.forEach(element => {
        element && observer.observe(element)
      })
    }
    setObserve(observer, refSauces.current, refBuns.current, refMain.current)

    return () => {
      observer.disconnect()
    }
  }, [tabs])

  return (
    <section className={`${style.section} mt-10 mb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={style.tab}>
        {tabs.map((tab, i) => (
          <Tab key={i} active={tab.isActive}>
            {tab.text}
          </Tab>
        ))}
      </div>
      <div ref={refObserver} className={style.ingredients}>
        <IngredientsSection
          title="Булки"
          ingredients={buns}
          count={count}
          ref={refBuns}
          type="buns"
        />
        <IngredientsSection
          title="Соусы"
          ingredients={sauces}
          count={count}
          ref={refSauces}
          type="sauces"
        />
        <IngredientsSection
          title="Начинки"
          ingredients={mains}
          count={count}
          ref={refMain}
          type="mains"
        />
      </div>
    </section>
  )
}

export default BurgerIngredients
