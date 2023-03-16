import { Box, Container, Grid, Typography } from '@mui/material'

import React, { useEffect } from 'react'

import { Article, AssignmentInd, FindInPage } from '@mui/icons-material'
import TotalCard from '../../components/dashboard/TestCard'
import useAuth from '../../hooks/useAuth'
import UserCard from '../../components/dashboard/UserCard'
import InstructionCard from '../../components/dashboard/InstructionCard'
import Api from '../../api/Api'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const { auth, setAuth } = useAuth()
  const [user, setUser] = React.useState({})
  const navigate = useNavigate()
  // useEffect(() => {
  //   // fetch user information
  //   const fetchUser = async () => {
  //     const { data } = await Api.get('/auth/me', {
  //       headers: {
  //         Authorization: `Bearer ${auth?.access_token}`,
  //       },
  //     })

  //     setAuth({ ...auth, user: data })
  //     localStorage.setItem('user', JSON.stringify(data))
  //     setUser(data)
  //   }

  //   const user = localStorage.getItem('user')
  //   if (user) {
  //     setUser(JSON.parse(user))
  //   } else {
  //     fetchUser()
  //   }
  // }, [user.email, auth, setAuth])

  useEffect(() => {
    // fetch user information
    const fetchUser = async () => {
      try {
        const { data } = await Api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${auth?.access_token}`,
          },
        })

        setAuth({ ...auth, user: data })
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
      } catch (error) {
        // delete all the user-related data from the local storage
        localStorage.removeItem('auth')
        localStorage.removeItem('user')
        setAuth(null)
        setUser({})
        navigate('/login', { replace: true })
      }
    }

    const user = localStorage.getItem('user')

    if (user) {
      setUser(JSON.parse(user))
    } else {
      fetchUser()
    }
  }, [user.email, auth, setAuth, navigate])
  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box className='pb-8'>
            <Typography color='textPrimary' variant='h4'>
              Selamat datang, {user?.name}
            </Typography>
            <Typography color='textSecondary' variant='body2'>
              IELTS Golden English
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCard
                test={user?.widget?.all_test}
                type='all'
                icon={<Article />}
                title='Semua Test'
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCard
                test={user?.widget?.finish_test}
                type='certified'
                icon={<AssignmentInd />}
                title='Test Selesai'
              />
              {/* <TotalCertifiedMember /> */}
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCard
                test={user?.widget?.review_test}
                type='review'
                icon={<FindInPage />}
                title='Dalam Review'
              />
              {/* <TasksProgress /> */}
            </Grid>
          </Grid>
          <div className='justify-round mt-4 flex space-x-6'>
            <UserCard user={user} />
            <InstructionCard />
          </div>
        </Container>
      </Box>
    </>
  )
}

export default AdminDashboard
