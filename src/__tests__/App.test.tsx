import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore, { MockStore } from 'redux-mock-store';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RecursivePartial } from 'shared/models';
import { RootState } from 'store/reducers/rootReducer';
import App from 'modules/App';

type MockRootState = RecursivePartial<RootState>;

const mockStore = configureStore<MockRootState, any>([thunk]);

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
    store = mockStore({
      setting: { locale: { iso: 'en' } }
    });
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
