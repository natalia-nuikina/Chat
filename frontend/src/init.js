import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import io from 'socket.io-client';
import { initReactI18next } from 'react-i18next';
import resources from './locales/ru.js';
import App from './App.js';
import store from './services/index.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
};

const init = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
    });

  const socket = io();

  return (
    <Provider config={rollbarConfig}>
      <StoreProvider store={store}>
        <ErrorBoundary>
          <App socket={socket} />
        </ErrorBoundary>
      </StoreProvider>
    </Provider>
  );
};

export default init;
