import { useEffect } from 'react'
import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})

  useEffect(() => {
    const useToken = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setAuth({ access_token: '' })
      } else {
        setAuth({ access_token: JSON.parse(token) })
      }
    }
    // get user data from local storage
    const userData = localStorage.getItem('user')
    if (userData) {
      setAuth({ ...auth, user: JSON.parse(userData) })
    }
    useToken()
  }, [])
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
