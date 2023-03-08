import { Box, Pagination, PaginationItem, Stack } from '@mui/material'
import React, { useEffect } from 'react'

import Quiz from '../../assets/Test/quiz.json'
import Timer from './Timer'
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom'
import DashboardNavBar from '../../components/DashboardNavBar'

import useAnswers from '../../hooks/useAnswers'
import { useRef } from 'react'
import DotIndicator from './DotIndicator'
import { useMemo } from 'react'

const PaginationTestLayout = () => {
  const { page: currentPage, section } = useParams()
  const currSection = Quiz.filter((item) => {
    if (item.section_name.toLowerCase() === section.toLowerCase()) {
      return item
    }

    return null
    //
  })

  const topPageRef = useRef()
  const pageRef = useRef()
  const [page, setPage] = React.useState(parseInt(currentPage))

  // eslint-disable-next-line no-use-before-define
  const [data, setData] = React.useState(currSection[0])
  const { setTestId } = useAnswers()
  const location = useLocation()
  const testId = location.state?.test_id

  const time = new Date()
  time.setMinutes(time.getMinutes() + 120)

  useMemo(() => {
    setPage(parseInt(currentPage))
  }, [currentPage])

  const questionPage = Quiz.reduce(
    (acc, item) => [...acc, ...item.parts.flatMap((num) => num)],
    []
  )

  // const filtered = Quiz.filter((item) => {
  //   if (item.section_name.toLowerCase() === section.toLowerCase()) {
  //     return item.parts[page - 1]
  //   }
  // })[0]

  // const context = filtered.parts.find(
  //   (item) => item.part_no.toString() === currentPage
  // )

  // const answerPage = answers.find((item) => item.page === page) || {
  //   answers: [],
  // }

  const totalPages = data.parts.length

  const handleChange = (event, value) => {
    // setPage(value)
    // navigate(`${value}`, { replace: true })
  }

  useEffect(() => {
    if (testId) {
      setTestId(testId)
    }
    console.log('cause')
    topPageRef.current.scrollIntoView({
      behavior: 'smooth',
    })
  }, [testId, setTestId, page])

  // function to change background color when page answered

  return (
    <Box ref={topPageRef} className='relative max-w-full'>
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

        <Box className='z-20 mx-auto flex w-full items-center justify-center space-x-8 bg-gray-100 bg-white py-4'>
          <Pagination
            color='primary'
            hideNextButton
            hidePrevButton
            ref={pageRef}
            renderItem={(item) => (
              <>
                {/* {filled.includes(currentPage.toString()) &&
                  item.page.toString() === currentPage && (
                    <DotIndicator filled={true} />
                  )} */}

                <DotIndicator itemPage={item.page} />
                <PaginationItem
                  className='cursor-not-allowed'
                  disabled={item.page > page}
                  // component={Link}
                  // to={`/test/${page}  `}
                  {...item}
                />
              </>
            )}
            boundaryCount={questionPage.length}
            count={questionPage.length}
            page={page}
          />

          {/* {navigateCallback && page === totalPages && (
            <Button
              variant='contained'
              color='secondary'
              className='justify-self-end'
              onClick={gotoNextSection}
            >
              Proceed to Next Section
            </Button>
          )} */}
        </Box>
      </Stack>
    </Box>
  )
}

export default PaginationTestLayout
