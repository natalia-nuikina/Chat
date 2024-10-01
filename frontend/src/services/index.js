import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slices/messagesSlice.js';
import channelsReducer from './slices/channelsSlice.js';
import modalsReducer from './slices/modalsSlice.js';
import userReducer from './slices/userSlice.js';
import { api } from './api.js';

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
