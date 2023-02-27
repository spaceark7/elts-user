import axios from 'axios'
import useSWR from 'swr'

export const examListEndpoint = '/exam-list'
export const checkTokenEndpoint = '/cek-token'
export const examScoreEndpoint = '/exam-score'
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

export const checkTestToken = async (access_token, test_token) => {
  const response = await ExamApi.post(
    checkTokenEndpoint,
    { token: test_token },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        ContentType: 'application/json',
      },
    }
  )

  return response.data
}

export const useExamList = (access_token) => {
  let auth = access_token

  if (!auth) {
    auth = JSON.parse(localStorage.getItem('token'))
  }

  const { data, error, isValidating, isLoading } = useSWR(
    examListEndpoint,
    () => getExamList(auth)
  )

  return {
    exam: data?.['exam-list'],
    error,
    isValidating,
    isLoading,
  }
}

export const getExamScore = async (access_token, id) => {
  let auth = access_token

  if (!auth) {
    auth = JSON.parse(localStorage.getItem('token'))
  }
  const response = await ExamApi.get(
    `${examScoreEndpoint}/${id}`,

    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        ContentType: 'application/json',
      },
    }
  )

  // console.log(response.data?.['exam-list'])

  return response.data?.['exam-list']
}
