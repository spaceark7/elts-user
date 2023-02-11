import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { ArticleOutlined } from '@mui/icons-material'
const TotalMemberCard = ({ test }) => {
  return (
    <Card>
      <CardContent className='p-4'>
        <Box className='flex items-center space-x-2'>
          <Box>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56,
              }}
            >
              <ArticleOutlined />
            </Avatar>
          </Box>
          <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
            <Grid item>
              <Typography color='textSecondary' gutterBottom variant='overline'>
                Semua Test
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
TotalMemberCard.defaultProps = {
  test: 0,
}
export default TotalMemberCard
