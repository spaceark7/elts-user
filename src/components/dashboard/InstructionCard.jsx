import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material'

import React from 'react'

const InstructionCard = () => {
  return (
    <Card className='w-full md:w-1/2 '>
      <CardHeader className='pb-2' title='Instruksi Mengikuti Test' />
      <Divider />
      <CardContent className='pt-2'>
        <Box>
          <Typography color='textPrimary' variant='body2'>
            1. Masuk ke menu <b>Test IELTS </b>
          </Typography>
          <Typography color='textPrimary' variant='body2'>
            2. Pada menu <b>Test IELTS</b> pilih salah satu test yang tersedia
          </Typography>
          <Typography color='textPrimary' variant='body2'>
            3. Pilih test yang akan diikuti
          </Typography>
          <Typography color='textPrimary' variant='body2'>
            4. Masukan <b>Token</b> pada kolom yang tersedia
          </Typography>
          <Typography color='textPrimary' variant='body2'>
            5. Klik tombol <b>Mulai Test</b>
          </Typography>
          <Typography color='textPrimary' variant='body2'>
            6. Selamat mengerjakan test.
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  )
}

export default InstructionCard
