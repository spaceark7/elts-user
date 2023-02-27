import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'

const MemberProfile = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
          mb={3}
        >
          <Avatar
            src={'/static/images/avatar/avatar_2.png'}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color='textPrimary' gutterBottom variant='h5'>
            {data.member.name}
          </Typography>
          <Typography color='textSecondary' variant='body2'>
            {data.member.email}
          </Typography>
        </Box>

        <Divider variant='fullWidth' />
        <Box mt={2}>
          <Box className='relative h-40 w-full'>
            <img
              src={'/static/images/qr-code.png'}
              alt='qr-code test result'
              className='absolute inset-0 h-full w-full object-contain'
            />
          </Box>
          <Box className='flex'>
            <Button className='mx-auto' variant='text'>
              Simpan QR Code
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MemberProfile
