import React, { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import style from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../UI/modal/modal'
import { useSelector, useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/burger-ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderDetails from '../order-details/order-details'
import { CLEAR_ORDER } from '../../services/actions/order-details'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import ForgotPassword from '../pages/forgot-password/forgot-password'
import ResetPassword from '../pages/reset-password/reset-password'
import Profile from '../pages/profile/profile'
import ProtectedRoutes from '../../hocs/protected-routes'
import NotFound404 from '../pages/not-found-404/not-found-404'
import { getUser } from '../../services/actions/auth'
import { getCookie } from '../../utils/auth'

function App() {
  const ModalSwitch = () => {
    const location = useLocation()
    const navigate = useNavigate()
    let background = location.state?.background

    const order = useSelector(state => state.orderDetails.order)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getIngredients())
      const cookie = getCookie('accessToken')
      cookie && dispatch(getUser())
    }, [dispatch])

    const closeModal = () => {
      order && dispatch({ type: CLEAR_ORDER })
      navigate(-1)
    }

    const mainPage = (
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    )

    return (
      <>
        <AppHeader />
        <main className={style.main}>
          <Routes location={background || location}>
            <Route index element={mainPage}></Route>
            <Route
              path="/ingredients/:ingredientId"
              element={<IngredientDetails title="Детали ингредиента" />}
            ></Route>
            <Route
              path="/login"
              element={
                <ProtectedRoutes onlyAuth={false}>
                  <Login />
                </ProtectedRoutes>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <ProtectedRoutes onlyAuth={false}>
                  <Register />
                </ProtectedRoutes>
              }
            ></Route>
            <Route
              path="/forgot-password"
              element={
                <ProtectedRoutes onlyAuth={false}>
                  <ForgotPassword />
                </ProtectedRoutes>
              }
            ></Route>
            <Route
              path="/reset-password"
              element={
                <ProtectedRoutes onlyAuth={false}>
                  <ResetPassword />
                </ProtectedRoutes>
              }
            ></Route>
            <Route
              path="/profile/*"
              element={
                <ProtectedRoutes onlyAuth={true}>
                  <Profile />
                </ProtectedRoutes>
              }
            ></Route>
            <Route path="*" element={<NotFound404 />}></Route>
          </Routes>
        </main>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal closeModal={closeModal} title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path="/modal-order"
              element={
                <ProtectedRoutes onlyAuth={true}>
                  {order && (
                    <Modal closeModal={closeModal}>
                      <OrderDetails />
                    </Modal>
                  )}
                </ProtectedRoutes>
              }
            />
          </Routes>
        )}
      </>
    )
  }
  return (
    <Router>
      <ModalSwitch />
    </Router>
  )
}

export default App
