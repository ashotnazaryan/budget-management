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
    contrastThreshold: 3,
    tonalOffset: 0.2
  },
});
