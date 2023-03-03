import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import RadioAnswer from './answers/RadioAnswer'
import TextAnswer from './answers/TextAnswer'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { useParams, useNavigate } from 'react-router-dom'
import Quiz from '../../assets/Test/quiz.json'
import useAnswers from '../../hooks/useAnswers'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import InnerImageZoom from 'react-inner-image-zoom'
import AudioPlayer from '../../components/test/Player'

const TestPage = () => {
  const { answers, setAnswers, setFilled } = useAnswers()
  const { page, section } = useParams()
  const navigate = useNavigate()
  const answerBoxRef = useRef()

  const [pageData, setPageData] = useState(
    Quiz.filter((item) => {
      if (item.section_name.toLowerCase() === section.toLowerCase()) {
        return item.parts[page - 1]
      }
      return null
    })[0].parts.find((item) => item.part_no === parseInt(page))
  )

  const filtered = useMemo(
    () =>
      Quiz.filter((item) => {
        if (item.section_name.toLowerCase() === section.toLowerCase()) {
          setPageData(item.parts[page - 1])
          return item.parts[page - 1]
        }
        return null
      })[0],
    [page, section]
  )
  // const context = data.parts.find((item) => item.part_no.toString() === page)

  const answerPage = answers.find((item) => item.page === page) || {
    answers: [],
  }

  const addAnswer = (data) => {
    const currPage = answers.find((item) => item.page === page)

    if (data.answer !== '') {
      if (!currPage) {
        setAnswers((prev) => [
          ...prev,
          {
            page,
            answers: [data],
          },
        ])
      } else {
        const newAnswer = currPage.answers.filter((item) => item.id !== data.id)
        newAnswer.push(data)
        newAnswer.sort((a, b) => a.id - b.id)
        setAnswers((prev) => [
          ...prev.filter((item) => item.page !== page),
          {
            page,
            answers: newAnswer,
          },
        ])

        answers.sort((a, b) => a.page - b.page)

        // remove empty value on answers array
      }
    } else {
      const newAnswer = currPage.answers.filter((item) => item.id !== data.id)
      console.log('null :', newAnswer)
      setAnswers((prev) => [
        ...prev.filter((item) => item.page !== page),
        {
          page,
          answers: newAnswer,
        },
      ])
    }

    // remove old answer
    // const newAnswer =
    //   answers
    //     .filter((item) => item.page === page)[0]
    //     ?.answers.filter((item) => item.id !== data.id) || []
    // console.log('bef a ', newAnswer)
    // newAnswer.push(data)
    // console.log('aft a ', newAnswer)
    // newAnswer.sort((a, b) => a.id - b.id)

    // setAnswer(newAnswer)

    // setAnswer((prev) => [
    //   ...prev,
    //   newAnswer.sort((a, b) => a.id_quiz - b.id_quiz),
    // ])
    // console.log('final: ', answer)
  }

  const resetScroll = () => {
    answerBoxRef.current.scrollIntoView({})
  }

  const sendAnswer = async () => {
    localStorage.setItem(
      `answers-page-${page}`,
      JSON.stringify({
        section: filtered.section_name,
        answers: answers[page - 1],
      })
    )

    // const newAnswerPage = answers.filter((item) => item.page !== page)
    // newAnswerPage.push({
    //   page,
    //   answers: answer,
    // })

    // console.log('answers state: ', answers)
    // const newAnswerPage = answers.filter((item) => item.page !== page)
    // console.log('before: ', newAnswerPage)
    // console.log(page)
    // newAnswerPage.push({
    //   page,
    //   answers: answer,
    // })

    // setAnswers(newAnswerPage.sort((a, b) => a.page - b.page))

    const title = filtered.section_name

    // try {
    //   const response = await Api.post(`/${title}`, {
    //     answers: answer,
    //   })

    //   setAnswers(newAnswerPage.sort((a, b) => a.page - b.page))

    //   setAnswer([])
    //   console.log('from answers : ', answers)

    //   console.log(response)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  useEffect(() => {
    resetScroll()
    // check if answer is equal to the question

    if (answerPage?.answers.length === pageData.answers.length) {
      setFilled((prev) => [...prev.filter((item) => item[0] !== page), page])
    } else {
      setFilled((prev) => [...prev.filter((item) => item[0] !== page)])
    }
  }, [
    answerPage.answers.length,
    pageData.answers.length,
    page,
    setFilled,
    pageData,
  ])

  return (
    <Box>
      <Container
        maxWidth='xl'
        className='relative  flex flex-col  space-x-2 divide-x-2 divide-slate-600 md:flex-row'
      >
        <Box className='w-1/2'>
          <Typography className='py-2 text-2xl font-bold' align='center'>
            {filtered.section_name} Section
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

        <Box className='sticky top-20 max-h-[80vh] w-1/2 overflow-y-auto border border-l'>
          <Typography align='center' className=' relative text-2xl font-bold'>
            Answer
          </Typography>
          <Box ref={answerBoxRef} p={2} className='relative space-y-2'>
            {pageData.answers.map((item, index) => {
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
            })}
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
                        navigate(`../${pageData.nav_next}`)
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Box>

                {/* <Button variant='contained' fullWidth onClick={sendAnswer}>
                  Save Answers
                </Button> */}
                {pageData.callback &&
                  filtered.parts.length.toString() === page && (
                    <Button
                      variant='contained'
                      color='info'
                      fullWidth
                      onClick={() =>
                        navigate(`${pageData.callback}`, {
                          replace: true,
                        })
                      }
                    >
                      Proceed Next Section
                    </Button>
                  )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default TestPage
