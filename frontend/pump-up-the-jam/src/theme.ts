import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 481,
      md: 769,
      lg: 1025,
      xl: 1201
    }
  },
  palette: {
    primary: {
      light: '#faf9f9',
      main: '#f9f8f8',
      dark: '#aeadad'
    },
    secondary: {
      light: '#ff6168',
      main: '#d7263d',
      dark: '#9e0017'
    },
    error: {
      main: red.A400
    },
    background: {
      paper: '#f4f4f4',
      default: '#ededed'
    }
  }
});

export { theme };
