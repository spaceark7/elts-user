import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import useAnswers from '../../../hooks/useAnswers'

const RadioAnswer = ({ data, addAnswer }) => {
  const { answers } = useAnswers()

  const contextAnswer = answers.filter((item) => item.id === data.id)[0] || null

  const [value, setValue] = useState(contextAnswer?.answer ?? '')

  const parentRef = useRef(null)

  const handleMouseDown = (event) => {
    event.stopPropagation()
  }

  // Return radio buttons for answer
  const handleChange = (event) => {
    setValue(event.target.value)
    event.preventDefault()
  }

  return (
    <Box onClick={handleMouseDown} ref={parentRef}>
      <Typography variant='overline'>
        Answer Question No.{data?.question_no}
      </Typography>
      <Box py={2}>
        <FormControl>
          <RadioGroup
            tabIndex={0}
            value={value}
            onBlur={() =>
              addAnswer({
                id: data.id,
                question_no: data.question_no,
                answer: value,
              })
            }
            onChange={handleChange}
            row
            aria-labelledby='demo-radio-buttons-group-label'
            name='radio-buttons-group'
            // Add tabindex attribute to get focus on tab
            // onMouseDown={handleMouseDown} // Prevent default scrolling behavior on click
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
