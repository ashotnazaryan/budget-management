import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore, { MockStore } from 'redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { RootState as MockRootState } from 'store/reducers/rootReducer';
import { useAppDispatch } from 'store';
import { openSideBar } from 'store/reducers';
import Header from 'layout/Header';

const mockStore = configureStore<MockRootState, any>([thunk]);

describe('Header component', () => {
  let store: MockStore<MockRootState, any>;

  beforeEach(() => {
    store = mockStore({} as MockRootState);
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
