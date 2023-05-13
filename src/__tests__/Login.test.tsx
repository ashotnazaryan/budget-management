import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from 'modules/Login';

describe('Login component', () => {
  test('renders', () => {
    render(<Login />);
  });

  test('opens new window when the Google button clicked', async () => {
    render(<Login />);

    window.open = jest.fn();
    const openMock = jest.spyOn(window, 'open');
    const googleButton = await screen.findByTestId('google-button');

    expect(googleButton).toBeInTheDocument();

    userEvent.click(googleButton);

    await waitFor(() => expect(openMock).toHaveBeenCalled());
  });

  test('opens new window when the Facebook button clicked', async () => {
    render(<Login />);

    window.open = jest.fn();
    const openMock = jest.spyOn(window, 'open');
    const facebookButton = await screen.findByTestId('facebook-button');

    expect(facebookButton).toBeInTheDocument();

    userEvent.click(facebookButton);

    await waitFor(() => expect(openMock).toHaveBeenCalled());
  });
});
