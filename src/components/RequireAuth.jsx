import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()

  // return auth?.role && auth?.accessToken ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={{ pathname: '/login', state: { from: location } }} />
  // )
  return true ? (
    <Outlet />
  ) : (
    <Navigate
      to={{ pathname: '/login', state: { from: location, replace: true } }}
    />
  )
}

export default RequireAuth
