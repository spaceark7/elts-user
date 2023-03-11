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
    <div>
      <h2>Audio Recorder</h2>
      <main>
        <div className='audio-controls'>
          {!permission ? (
            <button onClick={getPermission} type='button'>
              Get Microphone
            </button>
          ) : null}
          {!hasRecording && permission && recordingStatus === 'inactive' ? (
            <button onClick={handleStartRecording} type='button'>
              Start Recording
            </button>
          ) : null}
          {recordingStatus === 'recording' ? (
            <button onClick={stopRecording} type='button'>
              Stop Recording
            </button>
          ) : null}
        </div>
        {audio ? (
          <div className='audio-player'>
            <audio src={audio} controls></audio>
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default AudioControl
