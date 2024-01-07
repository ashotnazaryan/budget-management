import { createTheme, PaletteOptions } from '@mui/material/styles';
import { APP_COLORS } from 'shared/constants';

const lightPalette: PaletteOptions = {
  primary: {
    main: APP_COLORS.light.primary,
    light: '#358297',
    dark: '#21515e',
    contrastText: '#fff'
  },
  secondary: {
    main: APP_COLORS.light.secondary,
    contrastText: '#fff'
  },
  error: {
    main: APP_COLORS.light.error
  },
  info: {
    main: '#cccccc',
    dark: '#8c8c8c',
    light: '#f2f2f2',
    contrastText: '#000'
  },
  action: {
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  contrastThreshold: 3,
  tonalOffset: 0.2
};

const darkPalette: PaletteOptions = {
  primary: {
    main: APP_COLORS.dark.primary,
    light: '#339966',
    dark: '#1a4c34',
    contrastText: '#fff'
  },
  secondary: {
    main: APP_COLORS.dark.secondary,
    light: '#bf8040',
    dark: '#734d26',
    contrastText: '#fff'
  },
  error: {
    main: APP_COLORS.dark.error
  },
  info: {
    main: '#262626',
    light: '#333333',
    dark: '#1a1a1a',
    contrastText: '#fff'
  },
  action: {
    disabled: 'rgba(255, 255, 255, 0.3)'
  },
  contrastThreshold: 3,
  tonalOffset: 0.2
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
