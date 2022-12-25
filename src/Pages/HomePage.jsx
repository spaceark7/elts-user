import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Illu from '../assets/illustration-homepage.webp'
const HomePage = () => {
  return (
    <div className='max-w-screen h-screen max-h-screen'>
      <div className='flex h-full flex-col px-4 md:flex-row'>
        <Box className='flex h-1/2 flex-col justify-center text-start md:ml-8 md:h-full md:w-2/6'>
          <Box>
            <Typography className='font-semibold text-yellow-600'>
              Golden IELTS
            </Typography>
          </Box>
          <Typography className='my-2 ' fontWeight={'medium'} variant='h4'>
            The First online IELTS in Indonesia
          </Typography>
          <Typography className='mb-6' paragraph variant='body2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            minus ab! Repellendus cumque quibusdam nemo blanditiis delectus
            sunt, laudantium fugit enim a velit, quae nisi.
          </Typography>
          <Link to={'/login'}>
            <Button
              className='w-fit'
              fullWidth={false}
              variant='contained'
              color='primary'
            >
              Study Now
            </Button>
          </Link>
        </Box>
        <Box className='relative h-[50vh] w-full md:h-screen md:w-4/6'>
          <img
            className='absolute top-0 left-0 h-full w-full object-contain'
            src={Illu}
            alt='illustration'
          />
        </Box>
      </div>
    </div>
  )
}

export default HomePage
