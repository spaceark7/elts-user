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
import React from 'react'

const RadioAnswer = ({ data, handleAnswer }) => {
  const [value, setValue] = React.useState('')
  // Return radio buttons for answer
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <Card>
      <CardContent>
        <Typography variant='overline'>Jawaban Soal No. {data?.id}</Typography>
        <Box py={2}>
          <FormControl>
            <RadioGroup
              value={value}
              onChange={handleChange}
              onBlur={() => handleAnswer({ id: data.id, answer: value })}
              row
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='female'
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
      </CardContent>
    </Card>
  )
}

export default RadioAnswer
