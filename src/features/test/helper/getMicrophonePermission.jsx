export const getMicrophonePermission = async (setPermission, setStream) => {
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
