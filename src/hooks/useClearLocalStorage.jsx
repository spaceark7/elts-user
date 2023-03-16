import { useEffect } from 'react'

export default function useClearLocalStorage() {
  const answers = localStorage.getItem('answers')
  const activeTest = localStorage.getItem('activeTest')

  useEffect(() => {
    if (answers && activeTest) {
      localStorage.removeItem('answers')
      localStorage.removeItem('activeTest')
    }
  }, [activeTest, answers])
}
