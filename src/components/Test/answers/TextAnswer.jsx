import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import React from 'react'

const TextAnswer = ({ data, handleAnswer }) => {
  const [value, setValue] = React.useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <Card>
      <CardContent>
        <Typography variant='overline'>Jawaban Soal No. {data?.id}</Typography>
        <Box py={2}>
          <TextField
            fullWidth
            value={value}
            onBlur={() => handleAnswer({ id: data.id, answer: value })}
            onChange={handleChange}
            id='outlined-textarea'
            label='Jawaban'
            placeholder='Ketik jawaban disini'
            multiline
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default TextAnswer
