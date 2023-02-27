import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import Api, { getExamScore } from '../../api/Api'
import React, { useEffect, useMemo } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import NotFound from '../../components/Error/NotFound'
import MemberProfile from './Components/MemberProfile'
import MemberExamResult from './Components/MemberExamResult'
import useAuth from '../../hooks/useAuth'

const ExamResultInfo = ({ data }) => {
  console.log('result: ', data)
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={6} xs={12}>
        <MemberProfile data={data} />
      </Grid>
      <Grid item lg={8} md={6} xs={12}>
        <MemberExamResult data={data} />
      </Grid>
    </Grid>
  )
}

const UserExamResult = () => {
  const [data, setData] = React.useState({})
  const [errorData, setErrorData] = React.useState({})
  const { auth } = useAuth()
  const [accessToken, setAccessToken] = React.useState(auth.access_token)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await getExamScore(accessToken, id)

        setData(response)
      } catch (error) {
        setErrorData(error?.response.status)
      }
    }
    FetchData()
  }, [data?.['exam-list']?.id])

  let content

  if (errorData === 404) {
    content = <NotFound />
  }

  if (data?.id) {
    content = (
      <Box className='px-2 py-4'>
        <Box>
          <Button
            onClick={() => navigate(-1)}
            variant='text'
            startIcon={<ArrowBack />}
            size='small'
          >
            Kembali
          </Button>
        </Box>

        <Container maxWidth='lg'>
          <Typography sx={{ mb: 3 }} variant='h4'>
            Hasil Tes
          </Typography>
          <ExamResultInfo data={data} />
        </Container>
      </Box>
    )
  }

  return content
}

export default UserExamResult
