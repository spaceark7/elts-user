import { PlayDisabled } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Typography } from '@mui/material'
import { RHAP_UI } from 'react-h5-audio-player'
export const SuspendedControl = [
  <Box className='flex items-center space-x-2'>
    <CircularProgress color='secondary' />
    <Typography variant='caption'>Loading Assets</Typography>
  </Box>,
]

export const PlayControl = [
  RHAP_UI.MAIN_CONTROLS,
  'CURRENT_TIME',
  <> - </>,
  'DURATION',
  RHAP_UI.VOLUME_CONTROLS,
]
export const DisabledControl = [
  <Box className='flex items-center space-x-2'>
    <IconButton color='secondary' disabled>
      <PlayDisabled />
    </IconButton>
  </Box>,
  'CURRENT_TIME',
  <> - </>,
  'DURATION',
  RHAP_UI.VOLUME_CONTROLS,
]
