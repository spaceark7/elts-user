import { LISTENING, READING, SPEAKING, WRITING } from '../../../constant'

export const ExamPostBuilder = (endpoint, score) => {
  switch (endpoint) {
    case LISTENING:
      return {
        listening_score: score,
      }
    case READING:
      return {
        reading_score: score,
      }
    case SPEAKING:
      const data = {}

      score.forEach((item) => {
        data[`speaking_task_${item.question_no}`] = item.answer
      })
      return data
    case WRITING: {
      const data = {}

      score.forEach((item) => {
        data[`writing_task_${item.question_no}`] = item.answer
      })
      return data
    }

    default:
      return null
  }
}
