import {
  Box,
  Pagination,
  PaginationItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'

import Quiz from '../../assets/Test/quiz.json'
import Timer from './Timer'
import { Outlet, useParams, useLocation } from 'react-router-dom'
import DashboardNavBar from '../../components/DashboardNavBar'

import useAnswers from '../../hooks/useAnswers'
import { useRef } from 'react'

import { useMemo } from 'react'

const PaginationTestLayout = () => {
  const { page: currentPage } = useParams()

  const topPageRef = useRef()
  const pageRef = useRef()
  const [page, setPage] = React.useState(parseInt(currentPage))

  // eslint-disable-next-line no-use-before-define

  const { setTestId, answers } = useAnswers()
  const location = useLocation()
  const testId = location.state?.test_id

  const time = new Date()
  time.setMinutes(time.getMinutes() + 120)

  useMemo(() => {
    setPage(parseInt(currentPage))
  }, [currentPage])

  // get all the answer on each parts from the Quiz json
  const questions = useMemo(
    () =>
      Quiz.reduce(
        (acc, item) => [...acc, ...item.parts.flatMap((num) => num)],
        []
      ).reduce((acc, item) => [...acc, ...item.answers], []),
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

  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.pathname)
    }

    window.history.pushState(null, null, window.location.pathname)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

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

        <Box className='z-20 mx-auto w-full items-center justify-center space-x-8 bg-gray-100 bg-white py-4'>
          <Typography variant='h6' className='mx-auto w-fit font-bold'>
            Total Question : {questions.length}
          </Typography>
          <Box className='z-20 mx-auto flex items-center justify-center space-x-8 bg-gray-100 bg-white py-4'>
            <Pagination
              className='mx-auto w-full md:max-w-screen-lg'
              color='primary'
              hideNextButton
              hidePrevButton
              size='small'
              ref={pageRef}
              renderItem={(item) => (
                <>
                  {console.log(item)}
                  {answers.find((b) => b.id === item.page) ? (
                    <Tooltip title='Nice! You answer the question'>
                      <PaginationItem
                        className='cursor-not-allowed bg-green-200 font-semibold text-emerald-800'
                        size='small'
                        // component={Link}
                        // to={`/test/${page}  `}
                        {...(item,
                        { page: questions[item.page - 1].question_no })}
                      >
                        {questions[item.page - 1].question_no}
                      </PaginationItem>
                    </Tooltip>
                  ) : (
                    <PaginationItem
                      className='cursor-not-allowed'
                      size='small'
                      // component={Link}
                      // to={`/test/${page}  `}
                      {...(item,
                      { page: questions[item.page - 1].question_no })}
                    >
                      {questions[item.page - 1].question_no}
                    </PaginationItem>
                  )}
                  {/* {filled.includes(currentPage.toString()) &&
                  item.page.toString() === currentPage && (
                    <DotIndicator filled={true} />
                  )} */}
                </>
              )}
              boundaryCount={questions.length}
              count={questions.length}
              page={0}
            />
          </Box>

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
