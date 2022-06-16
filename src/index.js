import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_K64YglIBCsxehcEwZ55U7WUE00hsQHZORD');

const theme = createTheme({
  palette: {
    primary: {
      main: '#ee6535',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Elements stripe={stripePromise}>
            <App/>
          </Elements>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
