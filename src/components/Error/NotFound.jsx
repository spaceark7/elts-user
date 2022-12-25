import { ArrowBack } from '@mui/icons-material'
import { Button, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { Link as RouterLink } from 'react-router-dom'
const NotFound = () => {
  return (
    <Box
      component='main'
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%',
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography align='center' color='textPrimary' variant='h1'>
            404: Oops! Terjadi kesalahan
          </Typography>
          <Typography align='center' color='textPrimary' variant='subtitle2'>
            Halaman yang kamu cari sepertinya tidak tersedia atau kamu tidak
            memiliki akses ke halaman tersebut.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt='Under development'
              src='/static/images/undraw_page_not_found_su7k.svg'
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560,
              }}
            />
          </Box>

          <Button
            component={RouterLink}
            to='/dash'
            startIcon={<ArrowBack fontSize='small' />}
            sx={{ mt: 3 }}
            variant='contained'
          >
            Kembali ke dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default NotFound
