import { Box, Button, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import RadioAnswer from './answers/RadioAnswer'
import TextAnswer from './answers/TextAnswer'

import { useParams } from 'react-router-dom'
import Quiz from '../../assets/Test/quiz.json'
import useAnswers from '../../hooks/useAnswers'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import InnerImageZoom from 'react-inner-image-zoom'
import AudioPlayer from '../../components/test/Player'

const TestPage = () => {
  const { answers, setAnswers } = useAnswers()
  const { page, section } = useParams()
  const filtered = Quiz.filter((item) => {
    if (item.section_name.toLowerCase() === section.toLowerCase()) {
      return item.parts[page - 1]
    }
  })
  const [answer, setAnswer] = useState(answers[page - 1]?.answer || [])
  const data = filtered[0]
  const context = data.parts.find((item) => item.part_no.toString() === page)

  console.log(context)

  const addAnswer = (data) => {
    // remove old answer
    const newAnswer = answer.filter((item) => item.id !== data.id)
    newAnswer.push(data)
    newAnswer.sort((a, b) => a.id - b.id)

    setAnswer(newAnswer)

    // setAnswer((prev) => [
    //   ...prev,
    //   newAnswer.sort((a, b) => a.id_quiz - b.id_quiz),
    // ])
    // console.log('final: ', answer)
  }

  const sendAnswer = async () => {
    // localStorage.setItem(
    //   `answers-page-${page}`,
    //   JSON.stringify({
    //     page,
    //     answers,
    //   })
    // )
    // const newAnswerPage = answers.filter((item) => item.page !== page)
    // newAnswerPage.push({
    //   page,
    //   answers: answer,
    // })
    const newAnswerPage = answers.filter((item) => item.page !== page)
    console.log('before: ', newAnswerPage)
    newAnswerPage.push({
      page,
      answers: answer,
    })

    console.log('after: ', newAnswerPage)

    const title = data.section_name

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

  return (
    <Box>
      <Container
        maxWidth='xl'
        className='relative  flex  flex-col divide-x-2 divide-slate-600 md:flex-row'
      >
        <Box className='flex-1 '>
          <Typography className='py-2 text-2xl font-bold' align='center'>
            {data.section_name} Section
          </Typography>

          {context.audio && <AudioPlayer audio={context?.audio} />}

          <Box className='h-full w-full '>
            <Box className='relative h-3/4 w-full'>
              <InnerImageZoom
                zoomScale={0.5}
                src={context.question}
                zoomSrc={context.question}
              />
              {/* <img
                src={context.question}
                alt='question'
                className='absolute left-0 top-0 h-full w-full object-contain object-top'
              /> */}
            </Box>
          </Box>
        </Box>

        <Box className='sticky top-20 max-h-[80vh] max-w-md overflow-y-auto border border-l'>
          <Typography align='center' className=' relative text-2xl font-bold'>
            Answer
          </Typography>
          <Box p={2} className='relative space-y-2'>
            {context.answers.map((item, index) => {
              switch (item.answer_type) {
                case 'input':
                  return (
                    <TextAnswer
                      key={item.id}
                      handleAnswer={addAnswer}
                      data={item}
                      answer={answer}
                      type={item.field}
                    />
                  )

                case 'radio':
                  return (
                    <RadioAnswer
                      key={item.id}
                      handleAnswer={addAnswer}
                      data={item}
                      answer={answer}
                    />
                  )
              }
            })}
            <Box className='sticky bottom-0 z-50 bg-white py-10'>
              <Button variant='contained' fullWidth onClick={sendAnswer}>
                Save Answers
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default TestPage
