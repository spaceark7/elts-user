import { useEffect, useState } from 'react'
import { createBrowserHistory } from 'history'

const useInvalidateOnLeave = () => {
  const history = createBrowserHistory()
  const [shouldInvalidate, setShouldInvalidate] = useState(false)

  useEffect(() => {
    const unblock = history.block((location, action) => {
      console.log('location: ', location, 'action: ', action)
      if (shouldInvalidate) {
        console.log('location: ', location, 'action: ', action)
        const confirmInvalidate = window.confirm(
          'Your test will be invalidated if you leave the page!'
        )
        setShouldInvalidate(false)
        return confirmInvalidate
      }
    })

    const handlePopState = () => {
      console.log('listener')
      setShouldInvalidate(true)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      unblock()
      window.removeEventListener('popstate', handlePopState)
    }
  }, [shouldInvalidate, history])

  const handleLeave = () => {
    setShouldInvalidate(true)
    //remove all local storage related to test

    console.log('handleLeave')
  }

  return handleLeave
}

export default useInvalidateOnLeave
