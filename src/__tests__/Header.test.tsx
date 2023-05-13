import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore, { MockStore } from 'redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { RecursivePartial } from 'shared/models';
import { RootState } from 'store/reducers/rootReducer';
import { openSideBar } from 'store/reducers';
import { useAppDispatch } from 'store';
import Header from 'layout/Header';

type MockRootState = RecursivePartial<RootState>;

const mockStore = configureStore<MockRootState, any>([thunk]);

jest.mock('store', () => ({
  ...jest.requireActual('store'),
  useAppDispatch: jest.fn(),
}));

jest.mock('store/reducers', () => ({
  openSideBar: jest.fn(),
}));

describe('Header component', () => {
  let store: MockStore<MockRootState, any>;

  beforeEach(() => {
    store = mockStore({
      app: {
        sideBarOpened: false,
        status: 'idle'
      },
      summary: {}
    });
  });

  test('renders product name correctly', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const productName = await screen.findByTestId('product-name');

    expect(productName).toBeInTheDocument();
  });

  test('dispatches openSideBar action on menu icon click', async () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const menuIcon = await screen.findByTestId('menu-icon');

    fireEvent.click(menuIcon);

    expect(mockDispatch).toHaveBeenCalledWith(openSideBar());
  });
});
