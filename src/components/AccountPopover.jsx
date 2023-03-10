import { MenuItem, MenuList, Popover, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const clearAuth = () => {
    setAuth(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('expiryTime')
    navigate('/login')
  }
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant='overline'>Akun</Typography>
        <Typography color='text.secondary' variant='body2'>
          {auth.user?.name}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px',
            },
            padding: '12px 16px',
          },
        }}
      >
        <MenuItem onClick={clearAuth}>Keluar</MenuItem>
      </MenuList>
    </Popover>
  )
}

export default AccountPopover
