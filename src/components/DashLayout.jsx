import { Box } from '@mui/material'

import { Outlet } from 'react-router-dom'
import DashboardNavBar from './DashboardNavBar'
import DashboardSideBar from './DashboardSideBar'

const DashLayout = () => {
  return (
    <div className='relative flex max-w-full'>
      <Box className='relative z-50 '>
        <DashboardSideBar />
      </Box>

      <main className='flex-1 bg-slate-100'>
        <DashboardNavBar />
        <Box className=' px-4 pb-8'>
          <Outlet />
        </Box>
      </main>
    </div>
  )
}

export default DashLayout
