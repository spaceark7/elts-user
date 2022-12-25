import {
  Box,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import DashboardNavBar from '../DashboardNavBar'
import TestPage from './TestPage'

import Quiz from '../../assets/Test/quiz.json'
import Timer from './Timer'
import { Outlet, useNavigate } from 'react-router-dom'

const PaginationTestLayout = () => {
  const [page, setPage] = React.useState(1)
  const [data, setData] = React.useState(Quiz)
  const [answered, setAnswered] = React.useState([])

  const navigate = useNavigate()

  const handleChange = (event, value) => {
    setPage(value)
    navigate(`/test/${value}`)
  }

  // function to change background color when page answered
  const handleAnswered = (page) => {
    if (answered.includes(page)) {
      return 'bg-green-500'
    } else {
      return 'bg-gray-500'
    }
  }

  const time = new Date()
  time.setMinutes(time.getMinutes() + 120)

  return (
    <Box className='max-w-full'>
      <Stack className='mx-auto min-h-screen justify-center ' spacing={2}>
        <DashboardNavBar
          desktop={true}
          timerComponent={<Timer expiryTime={time} />}
        />

        {/* Render Page component */}
        <Box className='flex-1 '>
          {/* <TestPage page={page} data={data[page - 1]} /> */}
          <Outlet />
        </Box>

        <Box className='mb-4 flex justify-center'>
          <Pagination
            color='primary'
            hideNextButton
            hidePrevButton
            // renderItem={(item) => (
            //   <PaginationItem
            //     component={Link}
            //     to={`/test/${page}  `}
            //     {...item}
            //   />
            // )}
            boundaryCount={data.length}
            count={data.length}
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default PaginationTestLayout
