import { useState, useRef, useEffect, useCallback } from 'react'

const mimeType = 'audio/webm'

const AudioRecorder = ({ maxRecordingTime = 3000 }) => {
  const [permission, setPermission] = useState(false)
  const mediaRecorder = useRef(null)
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [stream, setStream] = useState(null)
  const [audio, setAudio] = useState(null)
  const [audioChunks, setAudioChunks] = useState([])

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        })
        setPermission(true)
        setStream(mediaStream)
      } catch (err) {
        alert(err.message)
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.')
    }
  }

  const startRecording = () => {
    setRecordingStatus('recording')
    const media = new MediaRecorder(stream, { type: mimeType })

    mediaRecorder.current = media

    mediaRecorder.current.start()

    let localAudioChunks = []
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return
      if (event.data.size === 0) return

      localAudioChunks.push(event.data)
      setAudioChunks((prevChunks) => [...prevChunks, ...localAudioChunks])
      console.log('mediaRecorder.current.ondataavailable', localAudioChunks)
    }

    setAudioChunks(localAudioChunks)
  }

  const stopRecording = useCallback(() => {
    setRecordingStatus('inactive')

    mediaRecorder.current.stop()
    console.log('media onstop', mediaRecorder.current.onstop)
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType })
      const audioUrl = URL.createObjectURL(audioBlob)

      setAudio(audioUrl)

      setAudioChunks([])
    }
  }, [audioChunks])

  // automatically stop recording after maxRecordingTime
  useEffect(() => {
    let timer
    if (recordingStatus === 'recording' && maxRecordingTime) {
      timer = setTimeout(() => {
        stopRecording()
      }, maxRecordingTime)
    }
    return () => clearTimeout(timer)
  }, [recordingStatus, maxRecordingTime, stopRecording])

  return (
    <div>
      <h2>Audio Recorder</h2>
      <main>
        <div className='audio-controls'>
          {!permission ? (
            <button onClick={getMicrophonePermission} type='button'>
              Get Microphone
            </button>
          ) : null}
          {permission && recordingStatus === 'inactive' ? (
            <button onClick={startRecording} type='button'>
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
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default AudioRecorder
