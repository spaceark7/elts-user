import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@mui/material'

const MemberExamResult = ({ data }) => {
  return (
    <Card>
      <CardHeader
        subheader={data.finish_date}
        title={'Hasil Skor Perhitungan'}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          {/* {data?.exams_section?.map((exam) => (
            <Grid key={exam.id} item md={6} xs={12}>
              <Typography variant='h6' fontWeight='regular'>
                Skor {exam.exam_name}
              </Typography>
              <Typography variant='h4'>{exam.score}</Typography>
            </Grid>
          ))} */}

          <Grid item lg={6} md={6} xs={12}>
            <Typography variant='h6' fontWeight='regular'>
              Skor Listening
            </Typography>
            <Typography variant='h4'>{data.listening_score}</Typography>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <Typography variant='h6' fontWeight='regular'>
              Skor Reading
            </Typography>
            <Typography variant='h4'>{data.reading_score}</Typography>
          </Grid>
          <Grid lg={6} item md={6} xs={12}>
            <Typography variant='h6' fontWeight='regular'>
              Skor Writing
            </Typography>
            <Typography variant='h4'>{data.writing_score}</Typography>
          </Grid>
          <Grid lg={6} item md={6} xs={12}>
            <Typography variant='h6' fontWeight='regular'>
              Skor Speaking
            </Typography>
            <Typography variant='h4'>{data.speaking_score}</Typography>
          </Grid>
        </Grid>
        <Box className='flex- mt-2 w-full justify-center rounded-lg bg-emerald-200 py-2 text-center text-emerald-700 lg:mt-8'>
          <Typography variant='h6' fontWeight='regular'>
            Total Skor
          </Typography>
          {/* <Typography variant='h4'>
            {data.exams_section
              .map((exam) => exam.score)
              .reduce((a, b) => a + b, 0)}
          </Typography> */}
        </Box>
      </CardContent>
    </Card>
  )
}

export default MemberExamResult
