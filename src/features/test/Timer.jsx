import { Alert, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'

const Timer = ({ expiryTime }) => {
  const [open, setOpen] = useState(false)
  const [expiry, setExpiry] = useState(() => {
    // ambil dari localStorage jika ada atau gunakan expiryTime
    const now = new Date()
    const future = now.getTime() + expiryTime * 1000
    return future
  })

  const handleOpenAlert = () => {
    setOpen(true)
  }

  useEffect(() => {
    // save the expiry time to localStorage whenever it changes
    localStorage.setItem('expiryTime', JSON.stringify(expiry))
  }, [expiry])

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: Date.parse(expiry),
    onExpire: handleOpenAlert,
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
            {expiry !== null ? (
              <>
                {hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
              </>
            ) : (
              <>Null</>
            )}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default Timer
