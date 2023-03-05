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
      return {
        speaking_score: score,
      }
    case WRITING:
      return {
        writing_score: score,
      }
    default:
      return null
  }
}
