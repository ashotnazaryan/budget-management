import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from 'modules/App';

const testTheme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#fff',
    },
  },
});

describe('App component', () => {
  const mockStore = configureStore();
  let store: MockStoreEnhanced<unknown>;

  beforeEach(() => {
    store = mockStore({
      setting: { locale: { iso: '' } }
    });
  });

  test('renders', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={testTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    );
  });
});
