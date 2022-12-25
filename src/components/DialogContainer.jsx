import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material'

const DialogContainer = (props) => {
  const {
    title,
    children,
    open,
    handleClose,
    maxWidth,
    fullWidth,
    ariaLabel,
    scroll,
  } = props

  if (scroll) {
    return (
      <Dialog
        aria-labelledby={ariaLabel}
        open={open}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id={ariaLabel}>{title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>{children}</DialogContent>
      </Dialog>
    )
  }
  return (
    <Box>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        scroll={scroll}
        open={open}
        onClose={handleClose}
        aria-labelledby={ariaLabel}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </Box>
  )
}

// default props
DialogContainer.defaultProps = {
  maxWidth: 'sm',
  fullWidth: false,
  ariaLabel: 'dialog',
  scroll: false,
}

export default DialogContainer
