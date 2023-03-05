import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAnswers from '../../hooks/useAnswers'

const RequireTestId = () => {
  const { testId, setTestId } = useAnswers()

  const localTestID = JSON.parse(localStorage.getItem('activeTest'))

  useEffect(() => {
    if (!testId && localTestID) {
      setTestId(localTestID)
    }

    return () => {
      setTestId(null)
    }
  }, [setTestId, testId, localTestID])

  return testId || localTestID ? (
    <Outlet />
  ) : (
    <Navigate replace={true} to={{ pathname: '/dashboard/user-exam' }} />
  )
}

export default RequireTestId
