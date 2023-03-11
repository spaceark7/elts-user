import { createContext, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const AnswersContext = createContext({})

export const AnswersProvider = ({ children }) => {
  const [answers, setAnswers] = useState([])
  const [filled, setFilled] = useState([])
  const [testId, setTestId] = useState(null)

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('answers'))

    if (storedAnswers) {
      setAnswers(storedAnswers)
    }
  }, [])

  return (
    <AnswersContext.Provider
      value={{ answers, setAnswers, filled, setFilled, testId, setTestId }}
    >
      <Outlet />
    </AnswersContext.Provider>
  )
}

export default AnswersContext
