import { useContext } from 'react'
import AnswersContext from '../context/AnswerContext'

const useAnswers = () => {
  return useContext(AnswersContext)
}

export default useAnswers
