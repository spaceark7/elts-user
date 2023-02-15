import { Box, Container, Grid, Typography } from '@mui/material'

import React, { useEffect } from 'react'

import { Article, AssignmentInd, FindInPage } from '@mui/icons-material'
import TotalCard from '../../components/Dashboard/TestCard'
import useAuth from '../../hooks/useAuth'
import UserCard from '../../components/Dashboard/userCard'
import InstructionCard from '../../components/Dashboard/InstructionCard'
import Api from '../../api/Api'

const AdminDashboard = () => {
  const { auth, setAuth } = useAuth()
  const [user, setUser] = React.useState({})
  useEffect(() => {
    // fetch user information
    const fetchUser = async () => {
      const { data } = await Api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${auth?.access_token}`,
        },
      })
      setAuth({ ...auth, user: data })
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
    }

    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    } else {
      fetchUser()
    }
  }, [])
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
            <Typography color='MenuText' variant='h4'>
              Selamat datang, {auth?.user?.name}
            </Typography>
            <Typography color='CaptionText' variant='body2'>
              IELTS Golden English
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCard
                test={4}
                type='all'
                icon={<Article />}
                title='Semua Test'
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCard
                test={4}
                type='certified'
                icon={<AssignmentInd />}
                title='Test Selesai'
              />
              {/* <TotalCertifiedMember /> */}
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCard
                test={4}
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
            {/* <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                 
                  <Typography color='textPrimary' gutterBottom variant='h5'>
                    asss
                  </Typography>
                  <Typography color='textSecondary' variant='body2'>
                    asss
                  </Typography>
                  <Typography color='textSecondary' variant='body2'>
                    ass
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
            </Card> */}
          </div>
        </Container>
      </Box>
    </>
  )
}

export default AdminDashboard
