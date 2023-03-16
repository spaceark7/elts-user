import { Box, Button, Container, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import RadioAnswer from './components/RadioAnswer'
import TextAnswer from './components/TextAnswer'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { useParams, useNavigate, useBeforeUnload } from 'react-router-dom'
import Quiz from '../../assets/Test/quiz.json'
import useAnswers from '../../hooks/useAnswers'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import InnerImageZoom from 'react-inner-image-zoom'
import AudioPlayer from '../../components/test/Player'
import { validateAnswer } from './helper/ValidateAnswer'
import AnswerKey from '../../assets/Test/answer_key.json'
import { submitTest, submitTestNoValidation } from '../../api/Api'
import useAuth from '../../hooks/useAuth'
import AudioRecorder from './components/AudioRecorder'
import SubmitProgress from './components/SubmitProgress'
import useInvalidateOnLeave from '../../hooks/useTestNavigationPrevention'
import { LISTENING, READING, SPEAKING, WRITING } from '../../constant'
import Timer from './Timer'

const TestPage = () => {
  const { answers, setAnswers, testId } = useAnswers()
  const { page, section } = useParams()
  const navigate = useNavigate()
  const answerBoxRef = useRef()
  const { auth } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const [pageData, setPageData] = useState(
    Quiz.reduce(
      (acc, item) => [...acc, ...item.parts.flatMap((num) => num)],
      []
    ).find((item) => item.page_no === parseInt(page))
  )

  const answerPage = useMemo(() => {
    return answers.find((item) => item.page === page) ?? { answers: [] }
  }, [answers, page])

  const handleRadioClick = (event) => {
    event.stopPropagation()
  }

  const addAnswer = useCallback(
    (data) => {
      // add new answers to the setAnswers state compare to the previous answers in the questions
      const currAnswer = answers.find((item) => item.id === data.id)

      if (data.answer.trim() !== '' && !currAnswer) {
        setAnswers((prevAnswers) => {
          const newAnswers = [
            ...prevAnswers,
            { ...data, question_section: section },
          ]
          localStorage.setItem('answers', JSON.stringify(newAnswers))
          return newAnswers
        })
      } else if (data.answer.trim() !== '') {
        const updatedAnswers = answers.map((item) =>
          item.id === data.id ? data : item
        )
        setAnswers((prevAnswers) => {
          localStorage.setItem('answers', JSON.stringify(updatedAnswers))
          return updatedAnswers
        })
      } else {
        const updatedAnswers = answers.filter((item) => item.id !== data.id)
        setAnswers((prevAnswers) => {
          localStorage.setItem('answers', JSON.stringify(updatedAnswers))
          return updatedAnswers
        })
      }
    },
    [answers, setAnswers, section]
  )

  const resetScroll = () => {
    answerBoxRef.current.scrollIntoView({})
  }

  /**
   * This function is used to submit the answer sheet. It checks the answer key and calculates the score of the student.
   * It then uses the submitTest function to submit the test to the server.
   * @param {string} access_token - the access token of the user
   * @param {string} section - the section of the test
   * @param {string} testId - the id of the test
   * @param {number} score - the score of the student
   */

  const sendAnswer = async () => {
    // sort the answer by page number
    answers.sort((a, b) => a.page - b.page)

    //get the user answer of the section
    const userAnswers = answers.filter(
      (item) => item.question_section.toLowerCase() === section.toLowerCase()
    )
    // check if the section is listening or reading
    if (
      section.toLowerCase() === LISTENING ||
      section.toLowerCase() === READING
    ) {
      // get the answer key of the section
      const answerKey = AnswerKey.find(
        (item) => item.section_name.toLowerCase() === section.toLowerCase()
      ).parts.flatMap((item) => item.answers)
      // validate the answer
      const score = validateAnswer(answerKey, userAnswers)
      // console.log('score: ', score)
      // console.log('testId: ', testId)

      // set the submitting state to true
      setIsSubmitting(true)
      // send the answer to the server
      const res = await submitTest(auth?.access_token, section, testId, score)
      if (res.success) {
        // console.log(res.message)
        // set the success message to the response's message
        setSuccessMessage(res)
      }
      // set the submitting state to false after 2 seconds
      setTimeout(() => {
        setIsSubmitting(false)
      }, 2000)

      // console.log(res)
      // navigate to the next section
      navigate(`${pageData.callback}`, { replace: true })
    } else if (section.toLowerCase() === WRITING) {
      setIsSubmitting(true)
      const res = await submitTestNoValidation(
        auth?.access_token,
        section,
        testId,
        userAnswers
      )
      if (res.success) {
        // console.log(res.message)
        // set the success message to the response's message
        setSuccessMessage(res)
      }
      setTimeout(() => {
        setIsSubmitting(false)
      }, 2000)
      // navigate to the next section
      navigate(`${pageData.callback}`, { replace: true })
    } else if (section.toLowerCase() === SPEAKING) {
      setIsSubmitting(true)
      const res = await submitTestNoValidation(
        auth?.access_token,
        section,
        testId,
        userAnswers
      )
      console.log('outer: ', res)
      if (
        res.success &&
        (res.response.status !== 400 ||
          res.response.status !== 500 ||
          res.response.status !== 404)
      ) {
        // console.log(res.message)
        // set the success message to the response's message
        setSuccessMessage(res)
        setTimeout(() => {
          setIsSubmitting(false)
        }, 2000)

        navigate(`${pageData.callback}`, { replace: true })
        localStorage.removeItem('answers')
        localStorage.removeItem('activeTest')
      } else {
        setSuccessMessage({
          success: false,
          message: 'Something went wrong. Please try again later.',
        })
        setTimeout(() => {
          setIsSubmitting(false)
        }, 10000)

        navigate(`${pageData.callback}`, { replace: true })
      }

      localStorage.removeItem('answers')
      localStorage.removeItem('activeTest')
      localStorage.removeItem('expiryTime')

      // navigate(`${pageData.callback}`, { replace: true })
    }
  }

  const handleLeave = useInvalidateOnLeave()

  // handle back and forward button clicks
  useEffect(() => {
    window.onpopstate = () => {
      handleLeave()
      navigate(`../../${section}/${page}`, { state: { test_id: testId } })
    }
  }, [handleLeave, navigate, page, section, testId])

  useBeforeUnload((event) => {
    localStorage.removeItem('answers')
    localStorage.removeItem('activeTest')

    event.preventDefault()
    return (event.returnValue = 'Are you sure you want to close?')
  })

  useEffect(() => {
    resetScroll()
  }, [page])

  useEffect(() => {
    const data = Quiz.reduce(
      (acc, item) => [...acc, ...item.parts.flatMap((num) => num)],
      []
    ).find((item) => item.page_no === parseInt(page))
    setPageData(data)
  }, [page])

  return (
    <>
      <SubmitProgress
        isSubmitting={isSubmitting}
        successMessage={successMessage}
      />

      <Box>
        <Box>
          <Timer expiryTime={20} />
        </Box>
        <Container
          maxWidth='xl'
          className='relative  flex flex-col  space-x-2 divide-x-2 divide-slate-600 md:flex-row'
        >
          <Box className='w-full md:w-1/2 lg:w-8/12'>
            <Typography className='py-2 text-2xl font-bold' align='center'>
              {pageData.section_name} Section
            </Typography>

            {pageData.audio && <AudioPlayer audio={pageData?.audio} />}

            <Box className=' w-full '>
              <Box className='relative h-3/4 w-full'>
                <InnerImageZoom
                  zoomScale={0.3}
                  src={pageData.question}
                  zoomSrc={pageData.question}
                />
                {/* <img
                src={context.question}
                alt='question'
                className='absolute left-0 top-0 h-full w-full object-contain object-top'
              /> */}
              </Box>
            </Box>
          </Box>

          <Box className='sticky top-20 max-h-[80vh] w-full overflow-y-auto border border-l md:w-1/2 lg:w-4/12'>
            <Typography align='center' className=' relative text-2xl font-bold'>
              Answer
            </Typography>
            <Box ref={answerBoxRef} p={2} className='relative space-y-2'>
              {pageData.answers.map((answer) => (
                <Box
                  key={answer.id}
                  ref={answer.id === answerPage.currAns ? answerBoxRef : null}
                  onClick={handleRadioClick}
                >
                  {answer.answer_type === 'radio' ? (
                    <RadioAnswer
                      data={answer}
                      addAnswer={addAnswer}
                      answerPage={answerPage}
                    />
                  ) : answer.answer_type === 'media' ? (
                    <AudioRecorder
                      data={answer}
                      addAnswer={addAnswer}
                      answerPage={answerPage}
                    />
                  ) : (
                    <TextAnswer
                      data={answer}
                      id={answer.id}
                      addAnswer={addAnswer}
                      type={answer.field}
                    />
                  )}
                </Box>
              ))}

              <Box className=' z-50 bg-white '>
                <Box className='flex flex-col space-y-4'>
                  <Box className='flex space-x-4'>
                    {pageData.nav_prev && (
                      <Button
                        variant='text'
                        color='primary'
                        fullWidth
                        startIcon={<ArrowBack />}
                        onClick={() => {
                          navigate(`../${pageData.nav_prev}`)
                        }}
                      >
                        Previous
                      </Button>
                    )}
                    {pageData.nav_next && (
                      <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        endIcon={<ArrowForward />}
                        onClick={() => {
                          navigate(`../${pageData.nav_next}`, { replace: true })
                        }}
                      >
                        Next
                      </Button>
                    )}
                    {pageData.callback && (
                      <Button
                        variant='contained'
                        color='success'
                        fullWidth
                        onClick={sendAnswer}
                      >
                        Submit & Continue
                      </Button>
                    )}
                  </Box>

                  {/* <Button variant='contained' fullWidth onClick={sendAnswer}>
                  Save Answers
                </Button> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default TestPage
