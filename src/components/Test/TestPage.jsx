import { Box, Button, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import RadioAnswer from './answers/RadioAnswer'
import TextAnswer from './answers/TextAnswer'

import Api from '../../api/Api'
import { useParams } from 'react-router-dom'
import Quiz from '../../assets/Test/quiz.json'

const TestPage = () => {
  // const { page, data } = props
  const { page } = useParams()
  const data = Quiz[page - 1]

  const [answers, setAnswers] = useState([])

  const addAnswer = (answer) => {
    // remove old answer

    const newAnswers = answers.filter((item) => item.id !== answer.id)
    //add new answer
    newAnswers.push(answer)
    setAnswers(newAnswers)
  }

  const sendAnswer = async () => {
    localStorage.setItem(`answers-page-${page}`, JSON.stringify(answers))
    console.log(answers)
  }

  return (
    <Box>
      <Container maxWidth='xl' className='flex flex-row'>
        <Box className=' flex-1'>
          <Typography className='py-2 text-2xl font-bold' align='center'>
            {data.section_name} Section
          </Typography>
          <Box className='max-h-[70vh] overflow-y-auto'>
            <Box className='relative h-screen  w-full'>
              <img
                src={data.question}
                alt='question'
                className='absolute left-0 top-0 h-full w-full object-contain'
              />
            </Box>
          </Box>
        </Box>

        <Box className='flex-1'>
          <Typography align='center' className=' text-2xl font-bold'>
            Answer
          </Typography>
          <Box p={2} className='max-h-[65vh] space-y-4 overflow-y-auto'>
            {data.answer_type.map((item, index) => {
              switch (item.answer_type) {
                case 'text':
                  return (
                    <TextAnswer
                      key={item.id_quiz}
                      handleAnswer={addAnswer}
                      data={item}
                    />
                  )

                case 'radio':
                  return (
                    <RadioAnswer
                      key={item.id_quiz}
                      handleAnswer={addAnswer}
                      data={item}
                    />
                  )
              }
            })}
            <Box>
              <Button variant='contained' fullWidth onClick={sendAnswer}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default TestPage
