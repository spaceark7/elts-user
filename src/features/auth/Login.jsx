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
import useAuth from './hooks/useAuth'
import { config } from '../../api/utils'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const { setAuth } = useAuth()
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
      const loginData = {
        email: values.email,
        password: values.password,
      }

      try {
        const response = await Api.post(
          '/login',
          JSON.stringify(loginData),
          config
        )

        const accessToken = response.data?.accessToken
        const role = response.data?.user.role
        setAuth({
          user: response.data?.user,
          role: role,
          accessToken: accessToken,
        })

        if (role === 'admin') {
          navigate('/dash', { replace: true })
        } else if (role === 'member') {
          navigate('/dash', { replace: true })
        }
        actions.setSubmitting(false)
      } catch (error) {
        setErrMessage(error.response.data ? error.response.data : error.message)
        setError(true)
        console.log(error)
      }
    },
  })

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
          </form>
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
        </Container>
      </Box>
    </>
  )
}

export default Login
