import { Box, Button, Container, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import RadioAnswer from './answers/RadioAnswer'
import TextAnswer from './answers/TextAnswer'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { useParams, useNavigate } from 'react-router-dom'
import Quiz from '../../assets/Test/quiz.json'
import useAnswers from '../../hooks/useAnswers'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import InnerImageZoom from 'react-inner-image-zoom'
import AudioPlayer from '../../components/test/Player'
import { validateAnswer } from './helper/ValidateAnswer'
import AnswerKey from '../../assets/Test/answer_key.json'
import { submitTest } from '../../api/Api'
import useAuth from '../../hooks/useAuth'
import AudioRecorder from './components/AudioRecorder'
import SubmitProgress from './components/SubmitProgress'

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
          const newAnswers = [...prevAnswers, data]
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
    [answers, setAnswers]
  )

  const resetScroll = () => {
    answerBoxRef.current.scrollIntoView({})
  }

  const sendAnswer = async () => {
    answers.sort((a, b) => a.page - b.page)
    if (
      section.toLowerCase() === 'listening' ||
      section.toLowerCase() === 'reading'
    ) {
      const answer_key = AnswerKey.find(
        (item) => item.section_name.toLowerCase() === section.toLowerCase()
      ).parts.flatMap((item) => item.answers)
      console.log('answer_key: ', answer_key)
      // console.log('user_answer: ', answers)

      const score = validateAnswer(answer_key, answers)
      console.log('score: ', score)
      console.log('testId: ', testId)
      setIsSubmitting(true)
      const res = await submitTest(auth?.access_token, section, testId, score)
      if (res.success) {
        console.log(res.message)
        setSuccessMessage(res)
      }
      setTimeout(() => {
        setIsSubmitting(false)
      }, 2000)

      console.log(res)
      navigate(`${pageData.callback}`, { replace: true })
    } else {
      navigate(`${pageData.callback}`, { replace: true })
    }
  }

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

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault()
      event.stopPropagation()
      return false
    }

    window.history.pushState(null, '', window.location.pathname)
    window.addEventListener('popstate', handleBackButton)

    return () => {
      window.removeEventListener('popstate', handleBackButton)
    }
  }, [section])

  // useEffect(() => {
  //   // check if answer is equal to the question

  //   if (answerPage?.answers.length === pageData.answers.length) {
  //     // setFilled((prev) => [...prev.filter((item) => item[0] !== page), page])
  //     setFilled((prev) => prev.concat([page]))
  //   } else {
  //     // setFilled((prev) => [...prev.filter((item) => item[0] !== page)])
  //     setFilled((prev) => prev.filter((item) => item !== page))
  //   }
  // }, [answerPage.answers.length, pageData.answers.length, page, setFilled])

  return (
    <>
      <SubmitProgress
        isSubmitting={isSubmitting}
        successMessage={successMessage}
      />

      <Box>
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

              {/* {pageData.answers.map((item, index) => {
              switch (item.answer_type) {
                case 'input':
                  return (
                    <TextAnswer
                      key={item.id}
                      addAnswer={addAnswer}
                      data={item}
                      type={item.field}
                    />
                  )

                case 'radio':
                  return (
                    <RadioAnswer
                      key={item.id}
                      addAnswer={addAnswer}
                      data={item}
                    />
                  )
                default:
                  return null
              }
            })} */}
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
                        onClick={
                          sendAnswer
                          // () =>
                          // navigate(`${pageData.callback}`, {
                          //   replace: true,
                          // })
                        }
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
