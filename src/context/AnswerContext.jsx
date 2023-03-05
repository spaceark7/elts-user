import { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

const AnswersContext = createContext({})

export const AnswersProvider = ({ children }) => {
  const [answers, setAnswers] = useState([])
  const [filled, setFilled] = useState([])
  const [testId, setTestId] = useState(null)

  return (
    <AnswersContext.Provider
      value={{ answers, setAnswers, filled, setFilled, testId, setTestId }}
    >
      <Outlet />
    </AnswersContext.Provider>
  )
}

export default AnswersContext
