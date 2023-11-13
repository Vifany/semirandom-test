import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#657B8B',
      
    },
    secondary: {
      main: '#8C6766',
    },
    background: {
      default: '#A19482',
      paper: '#E0C9A6'
    },
    
  },
  typography: {
    'fontFamily': 'Nimbus Mono',
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root:{
          '&.Mui-selected': {
            color: 'white',
          }
        }
      }
    }
  }
});

export default theme;