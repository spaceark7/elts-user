import { Box, DialogContentText, Typography } from '@mui/material'

const ExamInstruction = () => {
  return (
    <Box>
      <DialogContentText
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Typography color='CaptionText' variant='body2'>
          Mohon perhatikan instruksi berikut sebelum melanjutkan:
        </Typography>
        <Box>
          <Typography mb={1} color='CaptionText' variant='body2'>
            1. Setelah anda menekan tombol "Lanjutkan", akan muncul jendela
            dikiri atas layar anda. Kemudian klik tombol "Izinkan" atau "Allow"
            agar anda bisa menggunakan mikrofon saat menjawab soal Speaking.
          </Typography>
          <Box
            mb={1}
            sx={{
              sm: {
                height: '100px',
              },
              position: 'relative',
              width: '100%',
              height: '150px',
            }}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
                left: 0,
                position: 'absolute',
                objectFit: 'contain',
              }}
              src='/static/images/tutorial/mic_prompt.png'
              alt='mic prompt alert'
              className='h-full w-full'
            />
          </Box>
          <Typography mb={1} color='CaptionText' variant='body2'>
            2. Kemudian anda akan diarahkan ke halaman tes.
          </Typography>
        </Box>
      </DialogContentText>
    </Box>
  )
}

export default ExamInstruction
