import { Alert, Box } from '@mui/material'
import { useState } from 'react'
import 'react-h5-audio-player/lib/styles.css'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import { SuspendedControl, PlayControl, DisabledControl } from './HelperControl'

const Player = ({ audio }) => {
  const [error, setError] = useState(false)
  const [playToken, setPlayToken] = useState(true)
  const [readyToPlay, setReadyToPlay] = useState(false)
  let content

  if (error) {
    content = <p>Audio file not found</p>
  } else {
    content = (
      <Box>
        <AudioPlayer
          src={audio}
          showJumpControls={false}
          showSkipControls={false}
          autoPlayAfterSrcChange={false}
          onPlay={() => setPlayToken(false)}
          onCanPlay={() => setReadyToPlay(true)}
          hasDefaultKeyBindings={false}
          customAdditionalControls={[]}
          customControlsSection={
            playToken
              ? readyToPlay
                ? PlayControl
                : SuspendedControl
              : DisabledControl
          }
        />
      </Box>
    )
  }

  return (
    <Box className=' max-w-lg px-4'>
      {content}
      <Alert className='mt-2 text-xs font-semibold' severity='warning'>
        You can only play it once! So Please prepare yourself before proceed
      </Alert>
    </Box>
  )
}

export default Player
