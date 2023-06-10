import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RootState as MockRootState } from 'store/reducers/rootReducer';
import { Period } from 'shared/models';
import Settings from 'modules/Settings';

const mockStore = configureStore<MockRootState, any>([thunk]);

jest.mock('store/reducers', () => ({
  ...jest.requireActual('store/reducers'),
  selectSettings: jest.fn(() => ({
    defaultCurrency: {
      iso: 'USD',
      name: 'US Dollar',
      symbol: '$'
    },
    showDecimals: true,
    isDarkTheme: false,
    locale: {
      iso: 'en',
      isoIntl: 'en-US',
      displayName: 'English'
    },
    defaultPeriod: Period.month,
    defaultAccount: ''
  })),
  selectUser: jest.fn(() => ({
    userId: '1',
  })),
  selectApp: jest.fn(() => ({
    status: 'succeeded',
  })),
  selectAccount: jest.fn(() => ({
    accounts: [
      {
        id: '1',
        name: 'Wallet',
        balance: '10',
      },
    ],
    status: 'succeeded',
  })),
}));

describe('Settings component', () => {
  let store: MockStore<MockRootState, any>;

  beforeEach(() => {
    store = mockStore({} as MockRootState);
  });

  test('renders page title correctly', async () => {
    render(
      <Provider store={store}>
        <Settings />
      </Provider>
    );

    const pageTitle = await screen.findByTestId('page-title');

    expect(pageTitle).toBeInTheDocument();
  });
});
