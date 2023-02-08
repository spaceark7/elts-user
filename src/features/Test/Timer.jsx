import { Alert, AlertTitle, Box, Typography } from '@mui/material'
import React from 'react'
import { useTimer } from 'react-timer-hook'

const Timer = ({ expiryTime }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpenAlert = () => {
    setOpen(true)
  }

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: expiryTime,
    onExpire: () => handleOpenAlert(),
  })

  return (
    <Box className='flex flex-row items-center justify-around'>
      {open ? (
        <Alert severity='error'>Waktu Ujian Sudah Habis</Alert>
      ) : (
        <Box bgcolor='black' p={1} className='flex space-x-2 rounded-lg'>
          <Typography variant='body2' color='white'>
            Waktu tersisa :
          </Typography>
          <Typography color='white'>
            {hours}:{minutes}:{seconds}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default Timer
