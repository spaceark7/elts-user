import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  DialogActions,
  Divider,
  Typography,
} from '@mui/material'
import { Preview, Print, Quiz } from '@mui/icons-material'
import Api from '../../api/Api'
import React, { useEffect } from 'react'

import { Link as RouterLink } from 'react-router-dom'
import DialogContainer from '../../components/DialogContainer'
import ExamInstruction from './Components/ExamInstruction'
import useAuth from '../../hooks/useAuth'

import { AVAILABLE_TEST, REVIEW_TEST, FINISH_TEST } from '../../constant'

const ExamInfo = ({ data }) => {
  const [open, setOpen] = React.useState(false)

  const status =
    data.status === AVAILABLE_TEST ? (
      <Chip label='Tersedia' color='primary' />
    ) : data.status === REVIEW_TEST ? (
      <Chip label='Sedang Koreksi' color='warning' />
    ) : data.status === FINISH_TEST ? (
      'Selesai'
    ) : null

  const handleCloseDIalog = () => {
    setOpen(false)
  }
  return (
    <>
      <DialogContainer
        title='Perhatian! Baca Sebelum melanjutkan.'
        open={open}
        handleClose={handleCloseDIalog}
        ariaLabel='dialog-scroll-body'
        scroll={'paper'}
        maxWidth={'sm'}
      >
        <ExamInstruction />
        <DialogActions>
          <Button onClick={handleCloseDIalog} variant='text'>
            Batal
          </Button>
          <Button
            component={RouterLink}
            to='/exam/listening/1'
            variant='contained'
            color='primary'
          >
            Lanjutkan
          </Button>
        </DialogActions>
      </DialogContainer>
      <Card raised className='max-w-screen-lg py-4'>
        <CardContent>
          <Box className='mb-2 flex justify-between'>
            <Typography color='MenuText' variant='h6'>
              Informasi Tes
            </Typography>
            {status}
          </Box>

          <Divider variant='fullWidth' />

          <Box className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 '>
            <Box>
              <Typography
                fontWeight='semibold'
                color='GrayText'
                variant='subtitle1'
              >
                Nama Soal
              </Typography>
              <Typography
                fontWeight='medium'
                color='CaptionText'
                variant='body1'
              >
                {data.exam.name}
              </Typography>
              <Typography
                fontWeight='medium'
                color='GrayText'
                variant='caption'
              >
                {data.exam.description}
              </Typography>
            </Box>
            <Box>
              <Typography
                fontWeight='semibold'
                color='GrayText'
                variant='subtitle1'
              >
                Jumlah Soal
              </Typography>
              <Typography
                fontWeight='medium'
                color='CaptionText'
                variant='body1'
              >
                {data.test_amount}
              </Typography>
            </Box>
            <Box>
              <Typography
                fontWeight='semibold'
                color='GrayText'
                variant='subtitle1'
              >
                Durasi Tes
              </Typography>
              <Typography
                fontWeight='medium'
                color='CaptionText'
                variant='body1'
              >
                {data.test_duration} Menit
              </Typography>
            </Box>
            <Box>
              <Typography
                fontWeight='semibold'
                color='GrayText'
                variant='subtitle1'
              >
                Tanggal Kadaluarsa
              </Typography>
              <Typography
                fontWeight='medium'
                color='CaptionText'
                variant='body1'
              >
                {data.expired_date}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        {data.status === FINISH_TEST ? (
          <CardActions>
            <Button variant='text' color='primary' startIcon={<Print />}>
              Cetak Sertifikat
            </Button>
            <Button
              component={RouterLink}
              to='preview/1'
              variant='text'
              color='secondary'
              startIcon={<Preview />}
            >
              Lihat Hasil
            </Button>
          </CardActions>
        ) : (
          <CardActions>
            <Button
              // component={RouterLink}
              // to='/exam/listening/1'
              onClick={() => setOpen(true)}
              variant='outlined'
              color='primary'
              startIcon={<Quiz />}
            >
              Mulai Test
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  )
}

const UserExam = () => {
  const [data, setData] = React.useState()
  const { auth } = useAuth()

  useEffect(() => {
    const FetchData = async () => {
      const { data } = await Api.get(`/exam-list`, {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })

      const exam_list = data?.['exam-list']
      console.log(exam_list)
      setData(exam_list)
    }
    FetchData()
  }, [])

  return (
    <Box className='px-2 py-4'>
      <Box className='pb-8'>
        <Typography color='MenuText' variant='h4'>
          Test IELTS
        </Typography>
        <Typography color='CaptionText' variant='body2'>
          Menampilkan status informasi semua tes
        </Typography>
      </Box>

      <Box className='flex flex-col space-y-6'>
        {data?.map((item) => (
          <ExamInfo key={item.id} data={item} />
        ))}
      </Box>
    </Box>
  )
}

export default UserExam
