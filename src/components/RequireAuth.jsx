import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AnswersProvider } from '../context/AnswerContext'
import useAuth from '../hooks/useAuth'
import useClearLocalStorage from '../hooks/useClearLocalStorage'

const RequireAuth = () => {
  const { auth } = useAuth()

  // get token from local storage
  const token = localStorage.getItem('token')
  const localToken = JSON.parse(token)

  const answers = localStorage.getItem('answers')
  const activeTest = localStorage.getItem('activeTest')

  useClearLocalStorage()

  useEffect(() => {
    if (answers && activeTest) {
      localStorage.removeItem('answers')
      localStorage.removeItem('activeTest')
    }
  }, [activeTest, answers])

  return auth?.access_token && localToken ? (
    <AnswersProvider>
      <Outlet />
    </AnswersProvider>
  ) : (
    <Navigate replace={true} to={{ pathname: '/login' }} />
  )
}

export default RequireAuth
