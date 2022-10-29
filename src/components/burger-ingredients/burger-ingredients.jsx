import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react'
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
  const refViewportObserve = useRef()
  const refBuns = useRef()
  const refMain = useRef()
  const refSauces = useRef()
  const observerRef = useRef()
  const [tabs, setTabs] = useState([])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        const dataFromEntries = entries.map(entry => {
          const intersectionRatio = entry.intersectionRatio
          const entryType = entry.target.dataset.type
          const rectY = entry.boundingClientRect.y
          return { intersectionRatio, entryType, rectY }
        })
        dataFromEntries.sort((objA, objB) => {
          return objA.intersectionRatio === objB.intersectionRatio
            ? objA.rectY - objB.rectY
            : objB.intersectionRatio - objA.intersectionRatio
        })
        setTabs(
          [
            {
              type: 'buns',
              isActive: true,
              text: 'Булки',
              element: refBuns.current
            },
            {
              type: 'sauces',
              isActive: false,
              text: 'Соусы',
              element: refSauces.current
            },
            {
              type: 'mains',
              isActive: false,
              text: 'Начинки',
              element: refMain.current
            }
          ].map(tab => {
            return {
              ...tab,
              isActive: tab.type === dataFromEntries[0].entryType
            }
          })
        )
      },
      {
        root: refViewportObserve.current,
        rootMargin: '-35% 0px -65% 0px',
        threshold: 0
      }
    )
    const setObserve = (observer, ...array) => {
      array.forEach(element => {
        element && observer.observe(element)
      })
    }
    setObserve(
      observerRef.current,
      refSauces.current,
      refBuns.current,
      refMain.current
    )

    return () => {
      observerRef.current.disconnect()
    }
  }, [observerRef, refBuns, refSauces, refMain])

  const count = useMemo(() => {
    const obj = { [bun?._id]: 1 }
    fillings.forEach(filling =>
      obj[filling._id] ? obj[filling._id]++ : (obj[filling._id] = 1)
    )
    return obj
  }, [bun, fillings])

  const onClickTab = useCallback(element =>
    element.scrollIntoView({ behavior: 'smooth' })
  )

  return (
    <section className={`${style.section} mt-10 mb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={style.tab}>
        {tabs.map((tab, i) => (
          <Tab
            key={i}
            active={tab.isActive}
            onClick={() => onClickTab(tab.element)}
          >
            {tab.text}
          </Tab>
        ))}
      </div>
      <div ref={refViewportObserve} className={style.ingredients}>
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
