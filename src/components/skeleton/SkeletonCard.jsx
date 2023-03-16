import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
} from '@mui/material'

const SkeletonCard = () => {
  return (
    <Card raised className='max-w-screen-lg py-4'>
      <CardContent>
        <Box className='mb-2 flex justify-between'>
          <Skeleton variant='text' width={200} />
        </Box>

        <Divider variant='fullWidth' />

        <Box className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 '>
          <Box>
            <Skeleton variant='text' width={200} />
            <Skeleton variant='text' width={200} />
            <Skeleton variant='text' width={200} />
          </Box>
          <Box>
            <Skeleton variant='text' width={200} />
            <Skeleton variant='text' width={200} />
          </Box>
          <Box>
            <Skeleton variant='text' width={200} />
            <Skeleton variant='text' width={200} />
          </Box>
          <Box>
            <Skeleton variant='text' width={200} />
            <Skeleton variant='text' width={200} />
          </Box>
        </Box>
      </CardContent>

      <CardActions>
        <Skeleton variant='rectangular' width={100} />
        <Skeleton variant='rectangular' width={100} />
      </CardActions>
    </Card>
  )
}

export default SkeletonCard
