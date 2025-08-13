// src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#556B2F', // Olive Green
    },
    secondary: {
      main: '#D2691E', // Terracotta
    },
    background: {
      default: '#F5F0E1', // Sandy Beige
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
        color: '#556B2F',
        fontWeight: 500,
    },
    h2: {
      color: '#556B2F',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none', // Keeps button text normal case
          fontSize: '1rem',
          padding: '8px 20px',
        },
      },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: '#556B2F', // Olive Green for AppBar
            }
        }
    }
  },
});