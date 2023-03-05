import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAnswers from '../../hooks/useAnswers'

const RequireTestId = () => {
  const { testId, setTestId } = useAnswers()

  // get token from local storage
  const token = localStorage.getItem('token')
  const localToken = JSON.parse(token)

  useEffect(() => {
    if (!testId) {
      setTestId(JSON.parse(localStorage.getItem('activeTest')))
    }

    return () => {
      setTestId(null)
    }
  }, [setTestId, testId])

  return testId ? (
    <Outlet />
  ) : (
    <Navigate replace={true} to={{ pathname: '/dashboard' }} />
  )
}

export default RequireTestId
