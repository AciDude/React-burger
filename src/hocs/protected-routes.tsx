import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { selectUser, selectIsUserAuthChecked } from '../services/selectors'
import { useSelector } from '../hooks'

type TProps = {
  onlyAuth: boolean
}

export default function ProtectedRoutes({ onlyAuth }: TProps) {
  const location = useLocation()
  const user = useSelector(selectUser)
  const isUserAuthChecked = useSelector(selectIsUserAuthChecked)

  if (!isUserAuthChecked)
    return (
      <ScaleLoader
        color="#9b42f537"
        height={100}
        width={20}
        radius={10}
        cssOverride={{ alignSelf: 'center' }}
      />
    )

  if (onlyAuth && !user)
    return (
      <Navigate to="/login" replace state={{ pathname: location.pathname }} />
    )

  if (!onlyAuth && user)
    return <Navigate to={location.state?.pathname || '/'} replace />

  return <Outlet />
}
