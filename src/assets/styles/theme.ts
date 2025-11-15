import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E3DA3',
      light: '#8996EB',
    },
    secondary: {
      main: '#1E2024',
    },
    background: {
      default: '#151619',
      paper: '#F9FAFA',
    },
    text: {
      primary: '#1E2024',
      secondary: '#858B99',
    },
    error: {
      main: '#D03E3E',
    },
    warning: {
      main: '#CC3D6A',
    },
    info: {
      main: '#355EC5',
    },
    success: {
      main: '#508B26',
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      '-apple-system',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '140%',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '140%',
    },
    body1: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '140%',
    },
    body2: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '140%',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '5px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: '14px',
          color: '#858B99',
          borderBottom: '1px solid #E3E5E8',
        },
        body: {
          fontSize: '14px',
          borderBottom: '1px solid #E3E5E8',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: '1px solid #E3E5E8',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2E3DA3',
          fontWeight: 700,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#E3E5E8',
          '&:hover': {
            backgroundColor: '#d5d7dc',
          },
        },
      },
    },
  },
});

export default theme;
