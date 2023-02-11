import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'

const TotalCard = ({ test, type, icon, title }) => {
  const TestType =
    type === 'all'
      ? 'primary.main'
      : type === 'certified'
      ? 'success.main'
      : 'warning.main'
  return (
    <Card>
      <CardContent className='p-4'>
        <Box className='flex items-center space-x-2'>
          <Box>
            <Avatar
              sx={{
                backgroundColor: TestType,
                height: 56,
                width: 56,
              }}
            >
              {icon}
            </Avatar>
          </Box>
          <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
            <Grid item>
              <Typography color='textSecondary' gutterBottom variant='overline'>
                {title}
              </Typography>
              <Typography color='textPrimary' variant='h4'>
                {test}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}
// default props
TotalCard.defaultProps = {
  test: 0,
}
export default TotalCard
