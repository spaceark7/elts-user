import { CheckCircle } from '@mui/icons-material'
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material'

const SubmitProgress = ({ isSubmitting, successMessage }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isSubmitting}
    >
      {successMessage?.success ? (
        <Box className='flex flex-col items-center justify-center'>
          <CheckCircle className='h-14 w-14' color='inherit' />
          <Typography className='text-lg ' align='center'>
            {successMessage.message}
          </Typography>
        </Box>
      ) : (
        <Box className='flex flex-col items-center justify-center'>
          <CircularProgress color='inherit' />
          <Typography className='text-lg ' align='center'>
            {successMessage?.message ?? 'Submitting...'}
          </Typography>
        </Box>
      )}
    </Backdrop>
  )
}

export default SubmitProgress
