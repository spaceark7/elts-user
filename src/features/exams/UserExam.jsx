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
import useAuth from '../auth/hooks/useAuth'

const ExamInfo = ({ data }) => {
  const [open, setOpen] = React.useState(false)

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
            to={`/dash`}
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
            {data.test_status ? <Chip label='Lulus' color='success' /> : null}
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
                {data.test_name}
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

        {data.test_status ? (
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
              component={RouterLink}
              to='/test/1'
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
  const [data, setData] = React.useState({})
  const { auth } = useAuth()

  useEffect(() => {
    const FetchData = async () => {
      const response = await Api.get(`/member-test?user_id=${auth.user.id}`)

      setData(response.data[0])
    }
    FetchData()
  }, [])

  return (
    <Box className='px-2 py-4'>
      <Box className='pb-8'>
        <Typography color='MenuText' variant='h4'>
          Test IELTS
        </Typography>
        <Typography color='CaptionText' variant='caption'>
          Menampilkan informasi tes IELTS yang telah diikuti
        </Typography>
      </Box>

      <Box className='flex flex-col space-y-6'>
        {data?.test_data?.map((item) => (
          <ExamInfo key={item.id} data={item} />
        ))}
      </Box>
    </Box>
  )
}

export default UserExam
