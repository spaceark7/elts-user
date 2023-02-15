import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  Collapse,
  Alert,
} from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as Yup from 'yup'
import { useState } from 'react'
import { useFormik } from 'formik'
import Api from '../../api/Api'
import CloseIcon from '@mui/icons-material/Close'
import useAuth from '../../hooks/useAuth'
import { useEffect } from 'react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const { setAuth, auth } = useAuth()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email tidak valid')
        .max(255)
        .required('Email wajib diisi'),
      password: Yup.string()
        .max(255)
        .min(8, 'Sandi minimal 8 karakter')
        .required('Password wajib diisi'),
    }),
    onSubmit: async (values, actions) => {
      setError(false)
      setErrMessage('')
      const loginData = {
        email: values.email,
        password: values.password,
      }

      try {
        const { data } = await Api.post('auth/login', loginData)
        if (data) {
          const access_token = data.data?.access_token
          setAuth({
            access_token,
          })
          localStorage.setItem('token', JSON.stringify(access_token))
        } else {
          setError(true)
          setErrMessage('Terjadi kesalahan')
        }

        // try {
        //   const { data: user } = await Api.get('auth/me', {
        //     headers: {
        //       Authorization: `Bearer ${auth.accessToken}`,
        //     },
        //   })
        //   console.log(user)
        //   if (user) {
        //     setAuth({
        //       ...auth,
        //       user: {
        //         name: user.name,
        //         phone: user.phone,
        //         email: user.email,
        //         is_active: user.is_active,
        //       },
        //     })
        //   }
        // } catch (error) {
        //   setError(true)
        //   setErrMessage(error?.response?.data?.message)
        // }

        // if (user) {
        //   setAuth({
        //     ...auth,
        //     user: {
        //       name: user.name,
        //       phone: user.phone,
        //       email: user.email,
        //       is_active: user.is_active,
        //     },
        //   })
        // }

        navigate('/dashboard', { replace: true })
        actions.setSubmitting(false)
      } catch (error) {
        setError(true)
        setErrMessage(error?.response?.data?.message)
      }

      // await Api.post('auth/login', loginData)
      //   .then((res) => {
      //     const accessToken = res.data.data?.access_token

      //     setAuth({
      //       accessToken,
      //     })
      //     navigate('/dashboard', { replace: true })
      //   })
      //   .catch((err) => {
      //     setError(true)
      //     setErrMessage(err?.response?.data?.message)
      //   })

      // await Api.get('auth/me', {
      //   headers: {
      //     Authorization: `Bearer ${auth.accessToken}`,
      //   },
      // })
      //   .then((res) => {
      //     console.log(res.data)
      //     setAuth({
      //       ...auth,
      //       user: {
      //         name: res.data.name,
      //         phone: res.data.phone,
      //         email: res.data.email,
      //         is_active: res.data.is_active,
      //       },
      //     })
      //     navigate('/dashboard', { replace: true })
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })

      // try {
      //   const response = await Api.post('auth/login', loginData)

      //   if (response?.status == 404) {
      //     throw new Error(response.message)
      //   }

      //   const accessToken = response.data?.accessToken

      //   setAuth({
      //     // user: user.data,
      //     accessToken: accessToken,
      //   })

      //   // if (role === 'admin') {
      //   //   navigate('/dash', { replace: true })
      //   // } else if (role === 'member') {
      //   //   navigate('/dash', { replace: true })
      //   // }

      //   // navigate('/dash', { replace: true })
      //   actions.setSubmitting(false)
      // } catch (error) {
      //   setErrMessage(error?.message)
      //   setError(true)
      // }
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const localToken = JSON.parse(token)
    if (localToken !== null || auth?.accessToken) {
      navigate('/dashboard', { replace: true })
    }
  }, [])

  return (
    <>
      <Box
        className=' h-full py-8'
        component='main'
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth='sm'>
          <Link to='/'>
            <Box className='flex items-center'>
              <ArrowBackIcon />
              <Typography className='text- ml-2' variant='body2'>
                Kembali
              </Typography>
            </Box>
          </Link>

          <form
            className='rounded-2xl p-4 pb-12 shadow-lg'
            onSubmit={formik.handleSubmit}
          >
            <Box sx={{ my: 3 }}>
              <Typography color='textPrimary' variant='h4' fontWeight={'bold'}>
                Masuk
              </Typography>
              <Typography color='textSecondary' gutterBottom variant='body2'>
                Silahkan masuk menggunakan akun anda
              </Typography>
            </Box>

            {success && (
              <Collapse in={success}>
                <Alert
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={() => {
                        setSuccess(false)
                      }}
                    >
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                  severity='success'
                >
                  Member berhasil ditambahkan
                </Alert>
              </Collapse>
            )}
            {error && (
              <Collapse in={error}>
                <Alert
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={() => {
                        setError(false)
                      }}
                    >
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                  severity='error'
                >
                  {errMessage}
                </Alert>
              </Collapse>
            )}

            <div className='space-y-2'>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label='Email'
                margin='normal'
                name='email'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type='email'
                value={formik.values.email}
                variant='outlined'
              />

              <FormControl sx={{ width: '100%' }} variant='outlined'>
                <InputLabel
                  color={`${
                    Boolean(formik.touched.password && formik.errors.password)
                      ? 'error'
                      : 'primary'
                  }`}
                  htmlFor='password'
                >
                  Kata Sandi
                </InputLabel>
                <OutlinedInput
                  id='password'
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  name='password'
                  autoComplete='none'
                  type={showPassword ? 'text' : 'password'}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography ml={2} color={'error'} variant='caption'>
                    {formik.errors.password}
                  </Typography>
                )}
              </FormControl>
            </div>

            <Box sx={{ py: 2 }}>
              <Button
                color='primary'
                disabled={
                  formik.isSubmitting ||
                  Boolean(formik.errors.email) ||
                  Boolean(formik.errors.password)
                }
                fullWidth
                size='large'
                type='submit'
                variant='contained'
              >
                Masuk
              </Button>
            </Box>
            <Typography color='textSecondary' variant='body2'>
              Tidak punya akun?{' '}
              <Link
                to='/register'
                variant='subtitle2'
                underline='hover'
                sx={{
                  cursor: 'pointer',
                }}
              >
                Daftar disini
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default Login
