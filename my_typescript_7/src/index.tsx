import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { DarkTheme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <ThemeProvider theme={DarkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </RecoilRoot>
  // </React.StrictMode>
);