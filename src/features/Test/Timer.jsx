import { Alert, AlertTitle, Box, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { useTimer } from 'react-timer-hook'

const Timer = ({ expiryTime }) => {
  const localExpiryTime = JSON.parse(localStorage.getItem('expiryTime'))
  const [open, setOpen] = React.useState(false)
  const [expiry, setExpiryTime] = React.useState(null)
  const handleOpenAlert = () => {
    setOpen(true)
  }

  useMemo(() => {
    if (localExpiryTime) {
      // if expiry time is found, set it to state
      setExpiryTime(localExpiryTime)
    } else {
      // if expiry time is not found, set it to local storage

      localStorage.setItem('expiryTime', JSON.stringify(expiryTime))
    }

    // check local storage for expiry time
  }, [expiry, localExpiryTime])

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: Date.parse(localExpiryTime),
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
            {expiry !== null ? (
              <>
                {hours}:{minutes}:{seconds}
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
