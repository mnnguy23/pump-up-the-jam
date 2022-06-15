import { Alert, Snackbar } from "@mui/material";


export interface MiniSnackBarProps {
  isOpen: boolean;
  handleClose: () => void;
}
export default function MintSnackBar({isOpen, handleClose}: MiniSnackBarProps) {

  return (
    <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity='info' onClose={handleClose}>
          We will be able to mint soon! Come back later or check out our twitter!
        </Alert>
      </Snackbar>
  )
}