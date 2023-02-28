import { Box, Button, Container, Typography } from '@mui/material'
import InnerImageZoom from 'react-inner-image-zoom'

const QuestionPage = () => {
  return (
    <Container
      maxWidth='xl'
      className='relative  flex flex-col  space-x-2 divide-x-2 divide-slate-600 md:flex-row'
    >
      <Box className='flex-1 '>
        <Typography className='py-2 text-2xl font-bold' align='center'>
          {data.section_name} Section
        </Typography>

        {context.audio && <AudioPlayer audio={context?.audio} />}

        <Box className=' w-full '>
          <Box className='relative h-3/4 w-full'>
            <InnerImageZoom
              zoomScale={0.5}
              src={context.question}
              zoomSrc={context.question}
            />
            {/* <img
                src={context.question}
                alt='question'
                className='absolute left-0 top-0 h-full w-full object-contain object-top'
              /> */}
          </Box>
        </Box>
      </Box>

      <Box className='sticky top-20 max-h-[80vh] max-w-md overflow-y-auto border border-l'>
        <Typography align='center' className=' relative text-2xl font-bold'>
          Answer
        </Typography>
        <Box p={2} className='relative space-y-2'>
          {context.answers.map((item, index) => {
            switch (item.answer_type) {
              case 'input':
                return (
                  <TextAnswer
                    key={item.id}
                    addAnswer={addAnswer}
                    data={item}
                    type={item.field}
                  />
                )

              case 'radio':
                return (
                  <RadioAnswer
                    key={item.id}
                    addAnswer={addAnswer}
                    data={item}
                  />
                )
            }
          })}
          <Box className=' z-50 bg-white '>
            <Box className='flex flex-col space-y-4'>
              <Button variant='contained' fullWidth onClick={sendAnswer}>
                Save Answers
              </Button>
              {context.callback && data.parts.length.toString() === page && (
                <Button
                  LinkComponent={Link}
                  to={context.callback}
                  variant='text'
                  color='info'
                  fullWidth
                >
                  Proceed Next Section
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default QuestionPage
