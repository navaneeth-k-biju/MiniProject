import { createTheme } from '@mui/material/styles';

const MyTheme = createTheme({
  palette: {
    primary: {
      main: '#007b00',
    },
    secondary: {
      main: '#ffc107',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#f0f0f0',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          color: 'black',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          justifyContent: 'space-evenly',
          top: '0'
        },
        indicator: {
          backgroundColor: 'primary.main'
        },
        tab: {
          textTransform: 'none',
          '&.Mui-selected': {
            color: "primary.main",
          }, fontFamily: 'Roboto'
        }
      }
    },
    MuiToolbar: {
      defaultProps: {
        color: 'primary'
      },
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }
      }
    },
    MuiButton:{
      defaultProps:{

      },
      styleOverrides:{
        root:{
          background:'secondary.main'
        }
      }
    },
    
    MuiTextField:{
      defaultProps:{

      },
      styleOverrides:{
        root:{
          margin:"10px",
          width:"fit-content"
        }
      }
    },
    MuiFormControl:{
      defaultProps:{

      },
      styleOverrides:{
        root:{
          background:"secondary.main",
        }
      }
    }
  }
}
);

export default MyTheme;
