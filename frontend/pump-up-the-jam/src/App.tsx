import { Box, Button } from '@mui/material';
import { useState } from 'react';
import HeaderAppBar from './components/HeaderAppBar';
import MintSnackBar from './components/MintSnackBar';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    console.log(isOpen);
    setIsOpen(true);
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };
  return (
    <>
      <HeaderAppBar/>
      <Box width={'100%'} sx={{ bgcolor: '#cfe8fc', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MintSnackBar isOpen={isOpen} handleClose={handleClose} />

        <Box sx={{bgcolor: '#eee', height:'5vh', width:'8vh', display: 'flex', justifyContent:'center', alignItems:'center'}}>
          <Button onClick={onClick} variant='contained'>
            Mint
          </Button>
        </Box>
          
        </Box>   
      </>
  );
}

export default App;
