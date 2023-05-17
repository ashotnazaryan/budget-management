import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RootState } from 'store/reducers/rootReducer';
import { Period, RecursivePartial } from 'shared/models';
import Settings from 'modules/Settings';

type MockRootState = RecursivePartial<RootState>;

const mockStore = configureStore<MockRootState, any>([thunk]);

describe('Settings component', () => {
  let store: MockStore<MockRootState, any>;

  beforeEach(() => {
    store = mockStore({
      app: {
        status: 'succeeded'
      },
      account: {
        accounts: [
          {
            id: '1',
            name: 'Wallet',
            balance: '10'
          }
        ],
        status: 'succeeded'
      },
      user: {
        userId: '1',
      },
      setting: {
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
      }
    });
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
