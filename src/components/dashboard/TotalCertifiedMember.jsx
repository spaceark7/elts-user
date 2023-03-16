import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material'
import InsertChartIcon from '@mui/icons-material/InsertChart'

const TotalCertifiedMember = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='overline'>
              TOTAL MEMBER LULUS
            </Typography>
            <Typography color='textPrimary' variant='h4'>
              75.5%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'warning.main',
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress value={75.5} variant='determinate' />
        </Box>
        <Typography color='textSecondary' variant='caption'>
          3 dari 4 Member
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TotalCertifiedMember
