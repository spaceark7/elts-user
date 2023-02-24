import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAnswers from '../../../hooks/useAnswers'

const RadioAnswer = ({ data, addAnswer }) => {
  const { answers } = useAnswers()
  const { page } = useParams()
  const contextAnswer = answers
    .filter((item) => item.page === page)[0]
    ?.answers.find((item) => item.id === data.id)
  const [value, setValue] = useState(contextAnswer?.answer ?? '')

  // Return radio buttons for answer
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <Box>
      <Typography variant='overline'>Answer Question No.{data?.id}</Typography>
      <Box py={2}>
        <FormControl>
          <RadioGroup
            value={value}
            onBlur={() => addAnswer({ id: data.id, answer: value })}
            onChange={handleChange}
            row
            aria-labelledby='demo-radio-buttons-group-label'
            name='radio-buttons-group'
          >
            {data.options?.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.option}
                control={<Radio />}
                label={item.option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  )
}

export default RadioAnswer
