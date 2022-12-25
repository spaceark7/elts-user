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
} from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as Yup from 'yup'
import { useState } from 'react'
import { replace, useFormik } from 'formik'
import { MuiTelInput } from 'mui-tel-input'
import Api from '../../api/Api'

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const navigate = useNavigate({ replace: true })
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().max(255).min(8, 'Sandi minimal 8 karakter'),

      password: Yup.string().max(255).min(8, 'Sandi minimal 8 karakter'),

      confirmPassword: Yup.string()
        .max(255)
        .equals([Yup.ref('password'), null], 'Password tidak sama'),
    }),
    onSubmit: async (values, actions) => {
      const registerData = {
        ...values,
        role: 'member',
      }

      try {
        const response = await Api.post(
          '/register',
          JSON.stringify(registerData),
          config
        )
        console.log(response.data)
        navigate('/login')
        actions.setSubmitting(false)
      } catch (error) {
        console.log(error.message)
        setError(true)
        setErrMessage(error.message)
      }
      actions.setSubmitting(false)
    },
  })

  return (
    <>
      <Box
        className=' h-full '
        component='main'
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container className='pt-4' maxWidth='sm'>
          <form
            className=' rounded-2xl bg-white p-4 py-8 pb-12 shadow-lg'
            onSubmit={formik.handleSubmit}
          >
            <Box sx={{ my: 3 }}>
              <Typography color='textPrimary' variant='h4' fontWeight={'bold'}>
                Ganti Kata Sandi
              </Typography>
              <Typography color='textSecondary' gutterBottom variant='body2'>
                Silahkan isi kata sandi lama anda kemudian kata sandi baru anda
              </Typography>
            </Box>

            <div className='space-y-6'>
              <Box>
                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel
                    color={`${
                      Boolean(
                        formik.touched.currentPassword &&
                          formik.errors.currentPassword
                      )
                        ? 'error'
                        : 'primary'
                    }`}
                    htmlFor='currentPassword'
                  >
                    Kata Sandi Saat ini
                  </InputLabel>
                  <OutlinedInput
                    id='currentPassword'
                    error={Boolean(
                      formik.touched.password && formik.errors.password
                    )}
                    name='currentPassword'
                    autoComplete='none'
                    type={showPassword ? 'text' : 'password'}
                    onBlur={formik.handleBlur}
                    value={formik.values.currentPassword}
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
                    label='Kata Sandi Saat Ini'
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
                Update Kata Sandi
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default ChangePassword
