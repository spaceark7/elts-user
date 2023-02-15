import axios from 'axios'
import useSWR from 'swr'

export const examListEndpoint = '/exam-list'

export const ExamApi = axios.create({
  baseURL: 'https://admin.ielts-goldenenglish.com/public/api',
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
    () => getExamList(access_token),
    {
      onSuccess: (data) => {
        console.log('success', data)
      },
      onError: (error) => {
        console.log('error', error)
      },
    }
  )

  return {
    exam: data,
    error,
    isValidating,
    isLoading,
  }
}
