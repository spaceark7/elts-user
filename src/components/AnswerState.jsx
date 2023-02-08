import React from 'react'
import { Outlet } from 'react-router-dom'

const AnswerState = () => {
  const { answers } = useAnswers()
  return <Outlet />
}

export default AnswerState
