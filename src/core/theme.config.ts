import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#2b697a',
      light: '#4f8392',
      dark: '#205b6b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#b83f0f',
      contrastText: '#fff',
    },
    info: {
      main: '#cccccc',
      dark: '#8c8c8c',
      light: '#f2f2f2'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
});
