import React from 'react'
import { UserCircle as UserCircleIcon } from '../assets/icons/user-circle'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Box, IconButton, Toolbar } from '@mui/material'
import AccountPopover from './AccountPopover'

import { useProSidebar } from 'react-pro-sidebar'
const DashboardNavBar = (props) => {
  const [openAccountPopover, setOpenAccountPopover] = React.useState(false)
  const { toggleSidebar } = useProSidebar()
  const settingsRef = React.useRef(null)
  const { desktop, timerComponent } = props

  const handleToggleSidebar = () => {
    toggleSidebar()
  }
  return (
    <Box className='sticky top-0 z-40 w-full bg-white bg-opacity-50 backdrop-blur-md'>
      <Toolbar
        variant={desktop ? 'dense' : 'regular'}
        disableGutters
        className='flex items-center justify-between shadow-md sm:justify-end '
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <IconButton
          onClick={handleToggleSidebar}
          sx={{
            display: {
              xs: 'inline-flex',
              sm: 'none',
              lg: 'none',
            },
          }}
        >
          <MenuIcon fontSize='small' />
        </IconButton>
        {timerComponent !== null && timerComponent}
        <Avatar
          onClick={() => setOpenAccountPopover(true)}
          ref={settingsRef}
          sx={{
            cursor: 'pointer',
            height: 40,
            width: 40,
            ml: 1,
          }}
          src='/static/images/avatar/avatar.png'
        >
          <UserCircleIcon fontSize='small' />
        </Avatar>
        <AccountPopover
          anchorEl={settingsRef.current}
          onClose={() => setOpenAccountPopover(false)}
          open={openAccountPopover}
        />
      </Toolbar>
    </Box>
  )
}

// default props
DashboardNavBar.defaultProps = {
  desktop: false,
  children: null,
}

export default DashboardNavBar
