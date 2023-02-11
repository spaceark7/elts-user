import { Box, Button, Pagination, PaginationItem, Stack } from '@mui/material'
import React, { useEffect } from 'react'

import Quiz from '../../assets/Test/quiz.json'
import Timer from './Timer'
import { Outlet, useNavigate, useParams, Link } from 'react-router-dom'
import DashboardNavBar from '../../components/DashboardNavBar'

import useAnswers from '../../hooks/useAnswers'

const PaginationTestLayout = () => {
  const { page: currentPage, section } = useParams()
  const currSection = Quiz.filter((item) => {
    if (item.section_name.toLowerCase() === section.toLowerCase()) {
      return item
    }
  })
  const [page, setPage] = React.useState(1)
  const [data, setData] = React.useState(currSection[0])
  const { answers } = useAnswers()

  const [isAnswered, setIsAnswered] = React.useState([])

  console.log(data)

  const totalPages = data.parts.length
  const navigateCallback = data.parts[totalPages - 1]?.callback
  console.log('cb :', navigateCallback)

  // const totalPages = data
  //   .reduce((acc, item) => [...acc, ...item.parts.flatMap((num) => num)], [])
  //   .reduce((acc, item) => [...acc, ...item.answers], []).length

  const navigate = useNavigate()

  const handleChange = (event, value) => {
    setPage(value)
    navigate(`${value}`)
  }

  useEffect(() => {
    const is_answered = answers.find((item) => item.page === currentPage)
    if (is_answered) {
      setIsAnswered((prev) => [...prev, is_answered])
    }
  }, [answers])

  // function to change background color when page answered

  const time = new Date()
  time.setMinutes(time.getMinutes() + 120)

  return (
    <Box className='relative max-w-full'>
      <Stack className=' mx-auto min-h-screen justify-center ' spacing={2}>
        <DashboardNavBar
          desktop={true}
          timerComponent={<Timer expiryTime={time} />}
        />

        {/* Render Page component */}
        <Box className='flex-1 '>
          {/* <TestPage page={page} data={data[page - 1]} /> */}
          <Outlet />
        </Box>

        <Box className='sticky bottom-0 z-20 mx-auto mb-4 flex w-full items-center justify-center space-x-8 bg-white py-4'>
          <Pagination
            color='primary'
            hideNextButton
            hidePrevButton
            renderItem={(item) => (
              <PaginationItem
                // component={Link}
                // to={`/test/${page}  `}
                {...item}
              />
            )}
            boundaryCount={totalPages}
            count={totalPages}
            page={page}
            onChange={handleChange}
          />

          {navigateCallback && page === totalPages && (
            <Button
              variant='contained'
              color='secondary'
              className='justify-self-end'
              onClick={handleChange}
            >
              Proceed to Next Section
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export default PaginationTestLayout
