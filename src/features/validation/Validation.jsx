import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
const Validation = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Verifikasi IELTS Sertifikat | Eksekusi 1
            </Typography>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center' colSpan={12}>
                    IELTS Prediction Score
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'>Listening</TableCell>
                  <TableCell align='center'>Reading.</TableCell>
                  <TableCell align='center'>Writing</TableCell>
                  <TableCell align='center'>Speaking</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center'>40</TableCell>
                  <TableCell align='center'>35</TableCell>
                  <TableCell align='center'>63</TableCell>
                  <TableCell align='center'>40</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  )
}
export default Validation
