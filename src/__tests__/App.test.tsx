import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore, { MockStore } from 'redux-mock-store';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RootState as MockRootState } from 'store/reducers/rootReducer';
import App from 'modules/App';

const mockStore = configureStore<MockRootState, any>([thunk]);

jest.mock('store');
jest.mock('store/reducers/rootReducer');
jest.mock('store/reducers', () => ({
  ...jest.requireActual('store/reducers'),
  selectSettings: jest.fn(() => ({
    isDarkTheme: false,
    locale: {
      iso: 'en'
    }
  }))
}));

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
  let store: MockStore<MockRootState, any>;

  beforeEach(() => {
    store = mockStore({} as MockRootState);
  });

  test('renders with theme', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={testTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    );
  });
});
