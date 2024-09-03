import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import './i18next.js';
import { ErrorBoundary } from '@rollbar/react';
import App from './App';
import store from './slices/index.js';

const rollbarConfig = {
  accessToken: '74bc1b3567f84fce8d30f0ccaff463f6',
  environment: 'production',
};

function TestError() {
  const a = null;
  return a.hello();
}

const root = ReactDOM.createRoot(document.querySelector('div.h-100'));
root.render(
  <Provider config={rollbarConfig} store={store}>
    <ErrorBoundary>
      <App />
      <TestError />
    </ErrorBoundary>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
