import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

export default function ProtectedRoutes({ children, onlyAuth }) {
  const location = useLocation()
  const { user, userRequest } = useSelector(state => state.auth)

  if (userRequest) return null

  if (onlyAuth) {
    return !user ? (
      <Navigate to="/login" replace state={{ pathname: location.pathname }} />
    ) : (
      children
    )
  }

  return user ? (
    <Navigate to={location.state?.pathname || '/'} replace />
  ) : (
    children
  )
}

ProtectedRoutes.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
  onlyAuth: PropTypes.bool.isRequired
}
