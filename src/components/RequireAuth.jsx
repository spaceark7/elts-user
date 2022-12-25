import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../features/auth/hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()

  return auth?.role && auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: '/login', state: { from: location } }} />
  )
}

export default RequireAuth
