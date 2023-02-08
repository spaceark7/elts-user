import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const TextAnswer = ({ data, handleAnswer, answer, type }) => {
  const [value, setValue] = useState(answer[data.id - 1]?.answer || '')

  const handleChange = (event) => {
    setValue(event.target.value)
    // handleAnswer({ id_quiz: data.id_quiz, answer: value })
  }

  return (
    <Box>
      <Typography variant='overline'>Answer Question No. {data?.id}</Typography>
      <Box py={2}>
        <TextField
          fullWidth
          value={value}
          onBlur={() => handleAnswer({ id: data.id, answer: value })}
          onChange={handleChange}
          id='outlined-textarea'
          label='Answer'
          type={type}
          placeholder='Fill your answer here'
          multiline={type === 'text' ? true : false}
        />
      </Box>
    </Box>
  )
}

export default TextAnswer
