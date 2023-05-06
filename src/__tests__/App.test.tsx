import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RootState } from 'store/reducers/rootReducer';
import App from 'modules/App';
import { CURRENCIES, LOCALES } from 'shared/constants';
import { Period } from 'shared/models';

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

describe('App', () => {
  // TODO: move all mocks to __mocks__ folder
  const initialState: Partial<RootState> = {
    setting: {
      defaultCurrency: CURRENCIES[0],
      defaultPeriod: Period.month,
      showDecimals: true,
      isDarkTheme: true,
      locale: LOCALES[0],
      status: 'idle'
    },
  };
  const mockStore = configureStore();
  let store: MockStoreEnhanced<unknown>; // TODO: use RootState

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders App component', () => {
    jest.mock('store/reducers/settingSlice', () => ({
      selectSettings: jest.fn().mockReturnValue(initialState.setting),
    }));

    render(
      <Provider store={store}>
        <ThemeProvider theme={testTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    );
  });
});
