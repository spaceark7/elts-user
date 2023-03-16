import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Illu from '../assets/illustration-homepage.webp'
const HomePage = () => {
  return (
    <div className='max-w-screen h-screen max-h-screen'>
      <div className='flex h-full flex-col px-4 md:flex-row'>
        <Box className='flex h-1/2 flex-col justify-center text-start md:ml-8 md:h-full md:w-2/6'>
          <Box className='relative '>
            <img
              className='mx-auto h-10  w-fit object-contain '
              src='/static/images/golden.png'
            />
          </Box>

          <Typography
            className='my-2  font-semibold text-yellow-600'
            fontWeight={'medium'}
            variant='h4'
          >
            IELTS Golden English
          </Typography>
          <Typography className='mb-6' paragraph variant='body2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            minus ab! Repellendus cumque quibusdam nemo blanditiis delectus
            sunt, laudantium fugit enim a velit, quae nisi.
          </Typography>

          <Box className='flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-3'>
            <Button
              component={Link}
              to='/register'
              className='w-fit'
              fullWidth={true}
              variant='contained'
              color='primary'
            >
              Daftar Sekarang
            </Button>

            <Button
              component={Link}
              to='/login'
              className='w-fit'
              fullWidth={true}
              variant='outlined'
              color='primary'
            >
              Masuk
            </Button>
          </Box>
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
