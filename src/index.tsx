import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material/styles';
import { store } from './store';
import { theme } from './core/theme.config';
import AxiosInterceptor from './layout/AxiosInterceptor';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import App from './pages/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const clientId = `${process.env.REACT_APP_GOOGLE_OUATH_CLIENT_ID}`;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AxiosInterceptor>
            <GoogleOAuthProvider clientId={clientId}>
              <App />
            </GoogleOAuthProvider>
          </AxiosInterceptor>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
