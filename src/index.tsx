import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'core/theme.config';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import App from './pages/App';
import { store } from 'store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const clientId = `${process.env.REACT_APP_GOOGLE_OUATH_CLIENT_ID}`;

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
