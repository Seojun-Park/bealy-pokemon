import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import GlobalStyle from './utils/GlobalStyle.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename='/bealy-pokemon/'>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
