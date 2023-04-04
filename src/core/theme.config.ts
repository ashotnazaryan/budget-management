import { createTheme, PaletteOptions } from '@mui/material/styles';

const lightPalette: PaletteOptions = {
  primary: {
    main: '#2b697a',
    light: '#4f8392',
    dark: '#205b6b',
    contrastText: '#fff'
  },
  secondary: {
    main: '#de5114',
    contrastText: '#fff'
  },
  error: {
    main: '#de4545'
  },
  info: {
    main: '#cccccc',
    dark: '#8c8c8c',
    light: '#f2f2f2',
    contrastText: '#000'
  },
  contrastThreshold: 3,
  tonalOffset: 0.2
};

const darkPalette: PaletteOptions = {
  primary: {
    main: '#c99403',
    light: '#fbb904',
    dark: '#976f02',
    contrastText: '#fff'
  },
  secondary: {
    main: '#800040',
    contrastText: '#fff'
  },
  error: {
    main: '#ff6666'
  },
  info: {
    main: '404040',
    dark: '#333333',
    light: '#4d4d4d',
    contrastText: '#fff'
  },
};

const spacing = 4;

export const lightTheme = createTheme({
  spacing,
  palette: {
    ...lightPalette,
    mode: 'light'
  }
});

export const darkTheme = createTheme({
  spacing,
  palette: {
    ...darkPalette,
    mode: 'dark'
  }
});
