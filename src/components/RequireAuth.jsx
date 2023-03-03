import { useEffect } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()

  // get token from local storage
  const token = localStorage.getItem('token')
  const localToken = JSON.parse(token)

  // return auth?.role && auth?.accessToken ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={{ pathname: '/login', state: { from: location } }} />
  // )
  return (auth?.user && auth?.access_token) || localToken ? (
    <Outlet />
  ) : (
    <Navigate replace={true} to={{ pathname: '/login' }} />
  )
}

export default RequireAuth
