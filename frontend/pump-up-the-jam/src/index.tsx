import { ThemeProvider } from '@emotion/react';
import { Web3Provider } from '@ethersproject/providers';
import { ScopedCssBaseline } from '@mui/material';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const getLibary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibary}>
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline enableColorScheme>
        <App />
     </ScopedCssBaseline>
    </ThemeProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
