import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
const TotalMemberCard = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='overline'>
              TOTAL MEMBERS
            </Typography>
            <Typography color='textPrimary' variant='h4'>
              4000
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              className='bg-green-500'
              sx={{
                backgroundColor: 'warning.main',
                height: 56,
                width: 56,
              }}
            >
              <GroupsIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2,
          }}
        >
          <ArrowUpwardIcon color='success' />
          <Typography
            variant='body2'
            sx={{
              mr: 1,
            }}
          >
            16%
          </Typography>
          <Typography color='textSecondary' variant='caption'>
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TotalMemberCard
