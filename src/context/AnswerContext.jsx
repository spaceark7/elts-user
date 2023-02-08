import { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

const AnswersContext = createContext({})

export const AnswersProvider = ({ children }) => {
  const [answers, setAnswers] = useState([])

  return (
    <AnswersContext.Provider value={{ answers, setAnswers }}>
      <Outlet />
      {children}
    </AnswersContext.Provider>
  )
}

export default AnswersContext
