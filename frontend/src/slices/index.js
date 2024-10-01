import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice.js';
import channelsReducer from './channelsSlice.js';
import modalsReducer from './modalsSlice.js';
import userReducer from './userSlice.js';
import { api } from '../services/api.js';

export default configureStore({
  reducer: {
    messagesReducer,
    channelsReducer,
    modalsReducer,
    userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
