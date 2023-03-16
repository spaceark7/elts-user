import { Box, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useAnswers from '../../../hooks/useAnswers'

const TextAnswer = ({ data, addAnswer, type, id }) => {
  const { answers } = useAnswers()
  const [value, setValue] = useState('')
  const [contextAnswer, setContextAnswer] = useState(() => {
    return (
      answers.find((item) => item.id === data.id) ?? { id: data.id, answer: '' }
    )
  })

  useEffect(() => {
    const answer = answers.find((item) => item.id === data.id) ?? {
      id: data.id,
      answer: '',
    }
    setContextAnswer(answer)
  }, [answers, data.id])

  const wordCount = useMemo(() => {
    if (value) {
      return value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length >= 1).length
    }
    return 0
  }, [value])

  const handleChange = useCallback((event) => {
    setValue(event.target.value.toUpperCase())
    // handleAnswer({ id_quiz: data.id_quiz, answer: value })
  }, [])

  useEffect(() => {
    setValue(contextAnswer.answer)
  }, [contextAnswer])

  return (
    <Box>
      <Typography variant='overline'>
        Answer Question No. {data?.question_no}
      </Typography>
      <Box py={2}>
        <TextField
          fullWidth
          value={value}
          onBlur={() =>
            addAnswer({
              id: data.id,
              question_no: data.question_no,
              answer: value,
            })
          }
          onChange={handleChange}
          id={`outlined-textarea-${id}`}
          autoComplete='off'
          label='Answer'
          type={type}
          placeholder={` ${
            type === 'text' ? 'Write you essay' : 'Fill your answer here'
          }`}
          multiline={type === 'text'}
          rows={type === 'text' ? 10 : 1}
        />

        {type === 'text' && (
          <Box className='flex justify-end'>
            <Typography className='w-full text-right' variant='caption'>
              {`You have write ${wordCount} word${wordCount > 2 ? 's' : ''}`}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default TextAnswer
