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
import { MuiTelInput } from 'mui-tel-input'
import Api from '../../api/Api'
import { config } from '../../api/utils'
import CloseIcon from '@mui/icons-material/Close'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const navigate = useNavigate({ replace: true })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(255)
        .min(3, 'Nama tidak valid')
        .required('Nama wajib diisi'),
      phone: Yup.string()
        .max(15, 'Nomor handphone tidak valid')
        .min(12, 'Nomor handphone tidak valid')
        .required('Nomor telepon wajib diisi'),
      email: Yup.string()
        .email('Email tidak valid')
        .max(255)
        .required('Email wajib diisi'),
      password: Yup.string()
        .max(255)
        .min(8, 'Sandi minimal 8 karakter')
        .required('Password wajib diisi'),
      confirmPassword: Yup.string()
        .max(255)
        .equals([Yup.ref('password'), null], 'Password tidak sama')
        .required('Password wajib diisi'),
    }),
    onSubmit: async (values, actions) => {
      const registerData = {
        name: values.name.toUpperCase(),
        email: values.email,
        phone: values.phone,
        password: values.password,
        password_confirmation: values.confirmPassword,
      }

      await Api.post('auth/register', registerData, config)
        .then((response) => {
          console.log(response.data.message)
          navigate('/login', {
            replace: true,
            state: { message: response.data.message },
          })
          actions.setSubmitting(false)
        })
        .catch((error) => {
          setError(true)

          if (error.response.data?.email[0]) {
            setErrMessage('Email sudah terdaftar')
          }
          if (error.response.data?.phone[0]) {
            setErrMessage('Nomor telepon sudah terdaftar')
          }
          if (error.response.data?.email[0] && error.response.data?.phone[0]) {
            setErrMessage('Email dan nomor telepon sudah terdaftar')
          }
        })

      // try {
      //   // const response = await Api.post('auth/register', registerData)

      //   console.log(response)
      //   navigate('/login')
      //   actions.setSubmitting(false)
      // } catch (error) {
      //   console.log(error.message)
      //   setError(true)
      //   setErrMessage(error.message)
      // }
      actions.setSubmitting(false)
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
                Daftar Akun
              </Typography>
              <Typography color='textSecondary' gutterBottom variant='body2'>
                Silahkan isi informasi dibawah
              </Typography>
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
                    <Typography>{errMessage}</Typography>
                  </Alert>
                </Collapse>
              )}
            </Box>

            <div className='space-y-3'>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label='Nama Lengkap'
                margin='normal'
                name='name'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type='text'
                value={formik.values.name.toUpperCase()}
                variant='outlined'
              />
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

              <Box>
                <MuiTelInput
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  name='phone'
                  fullWidth
                  onlyCountries={['ID']}
                  defaultCountry='ID'
                  label='No. Handphone'
                  margin='normal'
                  forceCallingCode
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  onChange={(value, info) =>
                    formik.setFieldValue('phone', info.numberValue)
                  }
                  variant='outlined'
                />
              </Box>

              <Box>
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
              </Box>
              <Box>
                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel
                    color={`${
                      Boolean(
                        formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                      )
                        ? 'error'
                        : 'primary'
                    }`}
                    htmlFor='confirmPassword'
                  >
                    Konfirmasi Kata Sandi
                  </InputLabel>
                  <OutlinedInput
                    id='confirmPassword'
                    error={Boolean(
                      formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                    )}
                    name='confirmPassword'
                    autoComplete='none'
                    type={showConfirmPassword ? 'text' : 'password'}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          onMouseDown={(e) => e.preventDefault()}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Konfirmasi Kata Sandi'
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <Typography ml={2} color={'error'} variant='caption'>
                        {formik.errors.confirmPassword}
                      </Typography>
                    )}
                </FormControl>
              </Box>
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
                Daftar
              </Button>
            </Box>
            <Typography color='textSecondary' variant='body2'>
              Sudah punya akun?{' '}
              <Link
                to='/login'
                variant='subtitle2'
                underline='hover'
                sx={{
                  cursor: 'pointer',
                }}
              >
                Masuk disini
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default Register
