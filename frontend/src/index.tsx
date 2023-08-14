import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Header } from './components/Header';
import { Side } from './components/Side';
import { Main } from './components/Main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <Side />
    <Main />
  </React.StrictMode>
);
