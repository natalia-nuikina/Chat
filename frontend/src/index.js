import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import './index.css';
import './i18next.js';
import { Provider, ErrorBoundary } from '@rollbar/react';

import App from './App';
import store from './slices/index.js';

const rollbarConfig = {
  accessToken: '666fc536cb1c4f0786f0d25aad8946d4',
  environment: 'production',
};

const root = ReactDOM.createRoot(document.querySelector('div.h-100'));
root.render(
  <Provider config={rollbarConfig}>
    <StoreProvider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StoreProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
