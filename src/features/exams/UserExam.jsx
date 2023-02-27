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
  TextField,
} from '@mui/material'
import { Preview, Print, Quiz } from '@mui/icons-material'
import Api, { checkTestToken, useExamList } from '../../api/Api'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, redirect, useNavigate } from 'react-router-dom'
import DialogContainer from '../../components/DialogContainer'
import ExamInstruction from './Components/ExamInstruction'
import useAuth from '../../hooks/useAuth'
import { AVAILABLE_TEST, REVIEW_TEST, FINISH_TEST } from '../../constant'
import SkeletonCard from '../../components/Skeleton/SkeletonCard'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const ExamInfo = ({ data }) => {
  const [open, setOpen] = React.useState(false)

  const { auth } = useAuth()
  const navigate = useNavigate()
  const status =
    data.status === AVAILABLE_TEST ? (
      <Chip label='Tersedia' color='primary' />
    ) : data.status === REVIEW_TEST ? (
      <Chip label='Sedang Koreksi' color='warning' />
    ) : data.status === FINISH_TEST ? (
      <Chip label='Selesai' color='success' />
    ) : null

  const handleCloseDIalog = () => {
    setOpen(false)
  }
  const formik = useFormik({
    initialValues: {
      token: '',
    },
    validationSchema: Yup.object({
      token: Yup.string().required('Token wajib diisi'),
    }),

    onSubmit: async (values, actions) => {
      const res = await checkTestToken(
        auth.access_token,
        values.token.toUpperCase()
      )
      if (res.status !== 404) {
        // Navigate to listening page and replace the current page
        navigate('/exam/listening/1', {
          replace: true,
        })
        // navigate('/exam/listening/1')
      } else if (res.status === 404) {
        actions.setErrors({
          token: 'Token tidak valid',
        })
      }

      actions.setSubmitting(false)
    },
  })

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
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <Typography variant='overline' align='center'>
              Token Test
            </Typography>

            <Box py={2}>
              <TextField
                error={Boolean(formik.touched.token && formik.errors.token)}
                helperText={formik.touched.token && formik.errors.token}
                fullWidth
                label='Token Test'
                name='token'
                type='text'
                value={formik.values.token.toUpperCase()}
                onChange={formik.handleChange}
                placeholder='Fill your token test here'
              />
            </Box>
          </Box>

          <DialogActions>
            <Button
              sx={{
                marginRight: '8px',
              }}
              onClick={handleCloseDIalog}
              variant='text'
              color='error'
            >
              Batal
            </Button>
            <Button
              // component={RouterLink}
              // to='/exam/listening/1'
              variant='contained'
              color='primary'
              type='submit'
              disabled={formik.isSubmitting || formik.values.token === ''}
            >
              Lanjutkan
            </Button>
          </DialogActions>
        </form>
      </DialogContainer>

      <Card raised className='max-w-screen py-4 md:col-span-1 '>
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
                {data.exam.total_question}
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
                {data.exam.duration} Menit
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
                {data.exam.end_date}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        {data.status === FINISH_TEST ? (
          <CardActions>
            <Button
              component={RouterLink}
              to={`preview/${data.id}`}
              variant='text'
              color='secondary'
              startIcon={<Preview />}
            >
              Lihat Hasil
            </Button>
          </CardActions>
        ) : data.status == REVIEW_TEST ? (
          <> </>
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
  const [accessToken, setAccessToken] = useState(auth.accessToken)

  const { exam, error, isValidating, isLoading } = useExamList(
    auth.access_token
  )

  let content
  if (isLoading) {
    content = <SkeletonCard />
  } else if (error) {
    content = <Typography>Something went wrong</Typography>
  } else if (exam) {
    content = exam.map((item) => <ExamInfo key={item.id} data={item} />)
  } else {
    content = <Typography>Nothing Happen</Typography>
    console.log(isLoading, error, examData, isValidating)
  }

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

      <Box className='grid grid-cols-2 gap-y-4 md:gap-x-2 '>
        {/* {data?.map((item) => (
          <ExamInfo key={item.id} data={item} />
        ))} */}

        {content}
      </Box>
    </Box>
  )
}

export default UserExam
