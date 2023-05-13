import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import Settings from 'modules/Settings';

const mockStore = configureStore([thunk]);

describe('Settings component', () => {
  let store: MockStoreEnhanced<unknown>;

  beforeEach(() => {
    store = mockStore({
      app: {
        status: 'succeeded',
      },
      account: {
        accounts: [
          {
            id: 1,
            name: 'Wallet',
            balance: 10,
          },
          {
            id: 2,
            name: 'Card',
            balance: 20,
          },
        ],
        status: 'succeeded',
      },
      user: {
        userId: 1,
      },
      setting: {
        defaultCurrency: {
          iso: 'USD',
          name: 'US Dollar',
          symbol: '$',
        },
        showDecimals: true,
        isDarkTheme: false,
        locale: {
          iso: 'en',
          isoIntl: 'en-US',
          displayName: 'English'
        },
        defaultPeriod: 'month',
        defaultAccount: '',
      },
    });
  });

  test('renders the page title', async () => {
    render(
      <Provider store={store}>
        <Settings />
      </Provider>
    );

    const pageTitle = await screen.findByTestId('page-title');

    expect(pageTitle).toBeInTheDocument();
  });
});
