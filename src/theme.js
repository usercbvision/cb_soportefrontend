
import { createTheme } from '@mui/material/styles';

const commonTheme = {
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 12,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
};

const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#f57c00',
      light: '#ffa726',
      dark: '#e65100',
    },
    secondary: {
      main: '#9c27b0',
    },
    purple: {
      main: '#7b1fa2',
      light: '#9c27b0',
      dark: '#4a0072',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#f57c00',
      light: '#ffa726',
      dark: '#e65100',
    },
    secondary: {
      main: '#2196f3', // Corregido el valor del color secundario
    },
    purple: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
    },
  },
});


export { lightTheme, darkTheme };