import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsSection from '../ingredients-section/ingredients-section'
import style from './burger-ingredients.module.css'
import { useSelector } from '../../hooks'
import {
  selectBuns,
  selectMains,
  selectSauces,
  selectConstructorBun,
  selectConstructorFillings
} from '../../services/selectors'

const BurgerIngredients = function () {
  const buns = useSelector(selectBuns)
  const mains = useSelector(selectMains)
  const sauces = useSelector(selectSauces)
  const bun = useSelector(selectConstructorBun)
  const fillings = useSelector(selectConstructorFillings)

  const refViewportObserve = useRef<HTMLDivElement>(null)
  const refBuns = useRef<HTMLDivElement>(null)
  const refMain = useRef<HTMLDivElement>(null)
  const refSauces = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>()
  const [isActiveTab, setIsActiveTab] = useState({
    buns: true,
    mains: false,
    sauces: false
  })

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        const dataFromEntries = entries.map(entry => {
          const intersectionRatio = entry.intersectionRatio
          const entryType = (entry.target as HTMLElement).dataset.type
          const rectY = entry.boundingClientRect.y
          return { intersectionRatio, entryType, rectY }
        })
        dataFromEntries.sort((objA, objB) => {
          return objA.intersectionRatio === objB.intersectionRatio
            ? objA.rectY - objB.rectY
            : objB.intersectionRatio - objA.intersectionRatio
        })
        const activeTab = dataFromEntries[0].entryType
        activeTab &&
          setIsActiveTab({
            buns: false,
            mains: false,
            sauces: false,
            [activeTab]: true
          })
      },
      {
        root: refViewportObserve.current,
        rootMargin: '-35% 0px -65% 0px',
        threshold: 0
      }
    )

    const setObserve = (
      observer: IntersectionObserver,
      ...array: Array<HTMLDivElement | null>
    ) => {
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
      observerRef.current?.disconnect()
    }
  }, [observerRef, refBuns, refSauces, refMain])

  const count = useMemo(() => {
    const obj = bun ? { [bun._id]: 1 } : {}
    fillings.forEach(filling =>
      obj[filling._id] ? obj[filling._id]++ : (obj[filling._id] = 1)
    )
    return obj
  }, [bun, fillings])

  const onClickTab = useCallback(
    (element: HTMLDivElement) => element.scrollIntoView({ behavior: 'smooth' }),
    []
  )

  return (
    <section className={`${style.section} mt-10 mb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={style.tab}>
        <Tab
          active={isActiveTab.buns}
          onClick={() => refBuns.current && onClickTab(refBuns.current)}
          value="buns"
        >
          Булки
        </Tab>
        <Tab
          active={isActiveTab.sauces}
          onClick={() => refSauces.current && onClickTab(refSauces.current)}
          value="sauces"
        >
          Соусы
        </Tab>
        <Tab
          active={isActiveTab.mains}
          onClick={() => refMain.current && onClickTab(refMain.current)}
          value="mains"
        >
          Начинки
        </Tab>
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
