import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from 'react-auth-kit';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#eead00' },
    secondary: { main: '#272727' },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider authType={'cookie'} authName={'_auth'} cookieDomain={window.location.hostname} cookieSecure={false}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
