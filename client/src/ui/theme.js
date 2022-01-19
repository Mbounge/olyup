import { createTheme } from '@material-ui/core/styles';
//import { createTheme } from '@mui/material/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const calm =
  'linear-gradient(90deg, rgba(228,226,255,1) 0%, rgba(241,253,255,1) 0%, rgba(222,249,255,1) 100%)';
//#D8F2FF - nice sky blue
//#fff - default
//#19857b - secondary
//linear-gradient(90deg, rgba(0,255,188,1) 0%, rgba(190,246,255,1) 46%, rgba(35,218,255,1) 100%)
//linear-gradient(90deg, rgba(228,226,255,1) 0%, rgba(241,253,255,1) 0%, rgba(222,249,255,1) 100%)
const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          background: `${calm}`,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: '#14fbcb',
        opacity: 0.8,
        '&:hover': {
          backgroundColor: '#14fbcb',
          opacity: 1,
        },
      },
      current: {
        color: '#14fbcb',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '6px',
      },
    },
  },
  palette: {
    primary: {
      main: '#D8F2FF',
    },
    secondary: {
      main: '#14fbcb',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#D8F2FF',
    },
    calm: {
      main: `${calm}`,
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontFamily: 'Quicksand',
    },
    h2: {
      fontWeight: 700,
      fontFamily: 'Quicksand',
    },
    h3: {
      fontWeight: 700,
      fontFamily: 'Quicksand',
    },
    h4: {
      fontWeight: 700,
      fontFamily: 'Quicksand',
    },
    h5: {
      fontWeight: 700,
      fontFamily: 'Quicksand',
    },
    h6: {
      fontWeight: 700,
      fontFamily: 'Quicksand',
    },
  },
});

export default theme;
