import axios from 'axios'
import useSWR from 'swr'

export const examListEndpoint = '/exam-list'
export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const ExamApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getExamList = async (access_token) => {
  const response = await ExamApi.get(examListEndpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      ContentType: 'application/json',
    },
  })

  return response.data
}

export const useExamList = (access_token) => {
  const { data, error, isValidating, isLoading } = useSWR(
    examListEndpoint,
    () => getExamList(access_token)
  )

  const exam_list = data?.['exam-list']
  console.log(exam_list)

  return {
    exam: data?.['exam-list'],
    error,
    isValidating,
    isLoading,
  }
}
