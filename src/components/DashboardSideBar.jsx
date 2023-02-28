import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import { Selector as SelectorIcon } from '../assets/icons/selector'
import NavItem from './NavItem'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Menu,
  MenuItem,
  Sidebar,
  useProSidebar,
  sidebarClasses,
} from 'react-pro-sidebar'

import { Link, useNavigate } from 'react-router-dom'
import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionIcon from '@mui/icons-material/Description'
import PasswordIcon from '@mui/icons-material/Password'
import LogoutIcon from '@mui/icons-material/Logout'
import useAuth from '../hooks/useAuth'

const items = [
  {
    to: '/dashboard',
    icon: <BarChartIcon fontSize='small' />,
    title: 'Dasbor',
  },
  {
    to: 'user-exam',
    icon: <DescriptionIcon fontSize='small' />,
    title: 'Tes IELTS',
  },

  // {
  //   to: 'exam',
  //   icon: <DescriptionIcon fontSize='small' />,
  //   title: 'Tes IELTS',
  //   submenu: [
  //     {
  //       id: '1',
  //       to: 'exam-list',
  //       icon: <DescriptionIcon fontSize='small' />,
  //       title: 'Hasil Ujian',
  //     },
  //     {
  //       id: '2',
  //       title: 'Soal Ujian',
  //       to: 'user-exam',
  //       icon: <HistoryEduIcon fontSize='small' />,
  //     },
  //   ],
  // },

  {
    to: 'password',
    icon: <PasswordIcon fontSize='small' />,
    title: 'Ganti Kata Sandi',
  },
]

const Item = (props) => {
  const { title, icon, to, selected, setSelected, subMenuDetail } = props
  const { collapsed } = useProSidebar()

  let content
  if (title === 'Keluar') {
    return (content = collapsed ? (
      <>
        <MenuItem className='text-white' icon={icon}></MenuItem>
      </>
    ) : (
      <>
        <MenuItem className='text-white' icon={icon}>
          <Typography>{title}</Typography>
        </MenuItem>
      </>
    ))
  }

  content = collapsed ? (
    <>
      <MenuItem
        className='text-white'
        onClick={() => setSelected(title)}
        active={selected === title}
        routerLink={<Link to={to} />}
        icon={icon}
      ></MenuItem>
    </>
  ) : (
    <>
      <MenuItem
        className='text-white'
        onClick={() => setSelected(title)}
        active={selected === title}
        routerLink={<Link to={to} />}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </>
  )
  return content
}

const DashboardSideBar = () => {
  const [selected, setSelected] = React.useState()
  const [smallScreen, setSmallScreen] = React.useState(
    useMediaQuery((theme) => theme.breakpoints.between('sm', 'md'))
  )
  const navigate = useNavigate()
  const { collapseSidebar, collapsed } = useProSidebar()

  const { auth, setAuth } = useAuth()

  const clearAuth = () => {
    setAuth(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('expiryTime')
    navigate('/login')
  }
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div>
        <Box sx={{ p: 3 }}>
          <Typography>IELTS</Typography>
        </Box>
        <Box sx={{ px: 2 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: '11px',
              borderRadius: 1,
            }}
          >
            <div>
              <Typography color='inherit' variant='subtitle1'>
                Acme Inc
              </Typography>
              <Typography color='neutral.400' variant='body2'>
                Your tier : Premium
              </Typography>
            </div>
            <SelectorIcon
              sx={{
                color: 'neutral.500',
                width: 14,
                height: 14,
              }}
            />
          </Box>
        </Box>
      </div>
      <Divider
        sx={{
          borderColor: '#2D3748',
          my: 3,
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        {items.map((item) => (
          <NavItem
            key={item.title}
            icon={item.icon}
            href={item.href}
            title={item.title}
          />
        ))}
      </Box>
      <Divider sx={{ borderColor: '#2D3748' }} />
      <Box
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Typography color='neutral.100' variant='subtitle2'>
          Need more features?
        </Typography>
        <Typography color='neutral.500' variant='body2'>
          Check out our Pro solution template.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            mt: 2,
            mx: 'auto',
            width: '160px',
            '& img': {
              width: '100%',
            },
          }}
        >
          <img alt='Go to pro' src='/static/images/sidebar_pro.png' />
        </Box>
        {/* <NextLink href='https://material-kit-pro-react.devias.io/' passHref>
          <Button
            color='secondary'
            component='a'
            endIcon={<OpenInNewIcon />}
            fullWidth
            sx={{ mt: 2 }}
            variant='contained'
          >
            Pro Live Preview
          </Button>
        </NextLink> */}
      </Box>
    </Box>
  )

  return (
    <Box className='sticky top-0'>
      <Sidebar
        defaultCollapsed={smallScreen}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#16213E',
            minHeight: '100vh',
          },
        }}
        className='h-full max-h-screen overflow-y-auto bg-white  text-white opacity-100 '
        breakPoint='md'
      >
        <Box className='sticky top-0 z-20 bg-dark'>
          <Box
            className={`flex h-16 items-center ${
              collapsed ? 'justify-center' : 'justify-between '
            } px-2 transition ease-in-out`}
          >
            <Box
              className={`${
                collapsed ? 'hidden' : 'mx-auto block flex flex-1'
              }  `}
            >
              <img
                className='mx-auto h-8 w-fit object-contain pl-4 '
                src='/static/images/golden.png'
              />
            </Box>
            <IconButton
              className='hidden md:block'
              onClick={() => collapseSidebar()}
              sx={{}}
            >
              <MenuIcon fontSize='small' />
            </IconButton>
          </Box>
          {collapsed ? (
            <> </>
          ) : (
            <Box className='mx-auto flex flex-col justify-center pt-2 pb-8'>
              <Box className='relative  flex justify-center'>
                <img
                  className='mx-auto h-16  w-16  rounded-full'
                  src='/static/images/avatar/avatar.png'
                />
              </Box>
              <Typography marginTop={1} className='mx-auto' variant='caption'>
                {auth.user?.name}
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            '& .ps-menu-button:hover': {
              backgroundColor: 'rgba(15, 52, 96, 0.5)',
            },

            '& .ps-menu-button': {
              padding: '0 16px',
              borderRadius: '0.75rem',
            },
          }}
        >
          <Menu
            className='rounded-lg px-2 pb-8'
            menuItemStyles={{
              button: ({ active }) => {
                return {
                  backgroundColor: active ? '#0F3460' : 'none',
                  color: 'white',
                }
              },
            }}
          >
            {items?.map((item) => (
              <Item
                key={item.title}
                title={item.title}
                icon={item.icon}
                to={item.to}
                selected={selected}
                setSelected={setSelected}
                subMenuDetail={item?.submenu}
              />
            ))}
            <Box onClick={clearAuth}>
              <Item title={'Keluar'} icon={<LogoutIcon fontSize='small' />} />
            </Box>
          </Menu>
        </Box>
      </Sidebar>
    </Box>
  )
}

export default DashboardSideBar
