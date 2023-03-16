import { Box, Tooltip } from '@mui/material'
import useAnswers from '../../hooks/useAnswers'

const DotIndicator = ({ itemPage }) => {
  const { filled } = useAnswers()
  const isFilled = filled.includes(itemPage.toString())

  return (
    <>
      <Box className={'mx-auto mb-2 flex justify-center'}>
        <Tooltip title='All Question answered' placement='top'>
          <Box
            className={`${
              isFilled
                ? 'translate-y-0 opacity-100'
                : 'translate-y-50 opacity-0 '
            }  h-2 w-2 rounded-full bg-green-800 transition-all duration-500 ease-in-out `}
          ></Box>
        </Tooltip>
      </Box>
    </>
  )
}

export default DotIndicator
