// import { useEffect } from 'react'
// import { createContext, useState } from 'react'

// const AuthContext = createContext({})

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({})

//   useEffect(() => {
//     const getLocalToken = async () => {
//       const token = localStorage.getItem('token')
//       if (!token) {
//         setAuth({ access_token: '' })
//       } else {
//         setAuth({ access_token: JSON.parse(token) })
//       }
//     }
//     // get user data from local storage
//     const userData = localStorage.getItem('user')
//     if (userData) {
//       setAuth({ ...auth, user: JSON.parse(userData) })
//     }
//     getLocalToken()
//   }, [])
//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthContext

import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})

  useEffect(() => {
    const getLocalToken = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setAuth({ access_token: '' })
      } else {
        setAuth({ access_token: JSON.parse(token) })
      }
    }
    getLocalToken()

    // get user data from local storage
    const userData = localStorage.getItem('user')
    if (userData) {
      setAuth((prevAuth) => ({ ...prevAuth, user: JSON.parse(userData) }))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
