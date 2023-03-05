import { Navigate, Outlet } from 'react-router-dom'
import { AnswersProvider } from '../context/AnswerContext'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()

  // get token from local storage
  const token = localStorage.getItem('token')
  const localToken = JSON.parse(token)

  return (auth?.user && auth?.access_token) || localToken ? (
    <AnswersProvider>
      <Outlet />
    </AnswersProvider>
  ) : (
    <Navigate replace={true} to={{ pathname: '/login' }} />
  )
}

export default RequireAuth
