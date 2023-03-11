import { useState, useRef, useEffect, useCallback } from 'react'
import AudioControl from './AudioControl'

const mimeType = 'audio/webm'

const AudioRecorder = ({ maxRecordingTime = 10 }) => {
  const [permission, setPermission] = useState(false)
  const mediaRecorder = useRef(null)
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [stream, setStream] = useState(null)
  const [audio, setAudio] = useState(null)
  const [audioChunks, setAudioChunks] = useState([])
  const canvasRef = useRef(null)

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
    const media = new MediaRecorder(stream, {
      type: mimeType,
      audioBitsPerSecond: 192000,
    })

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
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType })

      // Read the blob as a data URL
      const reader = new FileReader()
      reader.readAsDataURL(audioBlob)

      reader.onloadend = () => {
        // Get the base64-encoded data URL
        const base64String = reader.result

        setAudio(base64String)
        setAudioChunks([])
      }
    }
  }, [audioChunks])

  // automatically stop recording after maxRecordingTime
  useEffect(() => {
    let timer
    if (recordingStatus === 'recording' && maxRecordingTime) {
      timer = setTimeout(() => {
        stopRecording()
      }, maxRecordingTime * 1000)
    }
    return () => clearTimeout(timer)
  }, [recordingStatus, maxRecordingTime, stopRecording])

  // create visualizer
  useEffect(() => {
    let requestAnimationFrameId
    const canvas = canvasRef.current
    const canvasCtx = canvas.getContext('2d')
    const audioCtx = new AudioContext({ sampleRate: 96000 })
    const analyser = audioCtx.createAnalyser()

    let source

    if (stream && recordingStatus === 'recording') {
      source = audioCtx.createMediaStreamSource(stream)
      source.connect(analyser)
      //   analyser.connect(audioCtx.destination)
    }

    analyser.fftSize = 4096
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      requestAnimationFrameId = requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)
      canvasCtx.fillStyle = 'rgb(255, 255, 255)'
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
      const barWidth = (canvas.width / bufferLength) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2

        canvasCtx.fillStyle = `rgb(${barHeight + 100},50,50)`
        canvasCtx.fillRect(
          x,
          canvas.height - barHeight / 2,
          barWidth,
          barHeight
        )

        x += barWidth + 1
      }
    }

    if (recordingStatus === 'recording' && canvas && source) {
      draw()
    } else if (recordingStatus === 'stopped' && canvas) {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
    }

    return () => {
      cancelAnimationFrame(requestAnimationFrameId)
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
      if (source) source.disconnect()
      audioCtx.close()
    }
  }, [recordingStatus, canvasRef, stream, stopRecording])

  return (
    <>
      <canvas ref={canvasRef} width={300} height={100} />
      <AudioControl
        permission={permission}
        audio={audio}
        getPermission={getMicrophonePermission}
        recordingStatus={recordingStatus}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
    </>
  )
}

export default AudioRecorder
