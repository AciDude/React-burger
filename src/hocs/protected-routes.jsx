import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

export default function ProtectedRoutes({ children }) {
  const location = useLocation()
  const { user, userRequest } = useSelector(state => state.auth)

  if (userRequest) return null

  return !user ? (
    <Navigate to="/login" replace state={{ pathname: location.pathname }} />
  ) : (
    children
  )
}

ProtectedRoutes.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired
}
