import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'

const UserCard = ({ user }) => {
  console.log(user)
  return (
    <Card className='w-full md:w-1/2'>
      <CardHeader className='pb-2' title='Informasi' />
      <Divider />
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box className='relative  flex justify-center'>
            <img
              className='mx-auto h-16  w-16  rounded-full'
              src='/static/images/avatar/avatar.png'
            />
          </Box>
          <Typography color='textPrimary' gutterBottom variant='h5'>
            {user.name}
          </Typography>
          <Typography color='textSecondary' variant='body2'>
            {user.email}
          </Typography>
          <Typography color='textSecondary' variant='body2'>
            {user.phone}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserCard
