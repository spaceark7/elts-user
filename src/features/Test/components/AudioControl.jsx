import { Mic, Stop } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import React, { useState } from 'react'

const AudioControl = ({
  permission,
  getPermission,
  recordingStatus,
  startRecording,
  stopRecording,
  audio,
}) => {
  const [hasRecording, setHasRecording] = useState(false)

  const handleStartRecording = () => {
    startRecording()
    setHasRecording(true)
  }

  return (
    <Box>
      <main>
        <div className='audio-controls transition-all duration-500 ease-out'>
          {!permission && !audio ? (
            <Button onClick={getPermission} variant='contained' color='info'>
              Open Microphone
            </Button>
          ) : !hasRecording && permission && recordingStatus === 'inactive' ? (
            <Box>
              <IconButton
                className='h-20 w-20 shadow-lg active:scale-90'
                onClick={handleStartRecording}
                color='info'
              >
                <Mic className='h-10 w-10' />
              </IconButton>
            </Box>
          ) : recordingStatus === 'recording' ? (
            <Box>
              <IconButton
                onClick={stopRecording}
                className='h-20 w-20 shadow-lg active:scale-90'
                color='error'
              >
                <Stop className='h-10 w-10' />
              </IconButton>
            </Box>
          ) : null}
          {/* {!hasRecording && permission && recordingStatus === 'inactive' ? (
            <Box>
              <IconButton
                className='h-20 w-20 shadow-lg active:scale-90'
                onClick={handleStartRecording}
                color='info'
              >
                <Mic className='h-10 w-10' />
              </IconButton>
            </Box>
          ) : null} */}
          {/* {recordingStatus === 'recording' ? (
            <Box>
              <IconButton
                onClick={stopRecording}
                className='h-20 w-20 shadow-lg active:scale-90'
                color='error'
              >
                <Stop className='h-10 w-10' />
              </IconButton>
            </Box>
          ) : null} */}
        </div>
        {console.log(audio)}
        {audio ? (
          <div className='audio-player'>
            <audio src={audio} controls></audio>
          </div>
        ) : null}
      </main>
    </Box>
  )
}

export default AudioControl
