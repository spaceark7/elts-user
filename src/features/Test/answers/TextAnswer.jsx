import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAnswers from '../../../hooks/useAnswers'

const TextAnswer = ({ data, addAnswer, type }) => {
  const { answers } = useAnswers()
  const { page } = useParams()
  const contextAnswer = answers
    .filter((item) => item.page === page)[0]
    ?.answers.find((item) => item.id === data.id)
  // console.log(contextAnswer)
  const [value, setValue] = useState(contextAnswer?.answer ?? '')
  const wordCount = value
    ? value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length >= 1).length
    : 0

  const handleChange = (event) => {
    setValue(event.target.value)
    // handleAnswer({ id_quiz: data.id_quiz, answer: value })
  }

  return (
    <Box>
      <Typography variant='overline'>
        Answer Question No. {data?.question_no}
      </Typography>
      <Box py={2}>
        <TextField
          fullWidth
          value={value}
          onBlur={() => addAnswer({ id: data.id, answer: value })}
          onChange={handleChange}
          id='outlined-textarea'
          autoComplete='off'
          label='Answer'
          type={type}
          placeholder='Fill your answer here'
          multiline={type === 'text' ? true : false}
        />

        {type === 'text' && (
          <Box className='flex justify-end'>
            <Typography
              className='w-full text-right'
              variant='caption'
            >{`You have write ${wordCount} word${
              wordCount > 2 ? 's' : ''
            }`}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default TextAnswer
